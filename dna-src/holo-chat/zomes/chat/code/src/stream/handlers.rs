
use hdk::error::ZomeApiResult;
use hdk::holochain_core_types::{
    hash::HashString,
    entry::{entry_type::AppEntryType, AppEntryValue, Entry},
    cas::content::Address,
};

use crate::stream::{
    Stream,
    Subject,
};

use crate::member::{
    handlers::get_my_member_id
};
use crate::utils;
use crate::member;
use crate::message;

pub fn handle_create_stream(
    name: String,
    description: String,
    initial_members: Vec<member::Member>,
    public: bool,
) -> ZomeApiResult<Address> {

    let stream = Stream{name, description, public};

    let entry = match public {
        true => Entry::App(
            AppEntryType::from("public_stream"),
            AppEntryValue::from(stream)
        ),
        false => Entry::App(
            AppEntryType::from("direct_stream"),
            AppEntryValue::from(stream)
        )
    };
    let stream_address = hdk::commit_entry(&entry)?;
    utils::link_entries_bidir(&get_my_member_id().hash(), &stream_address, "member_of", "has_member")?;
    for member in initial_members {
        utils::link_entries_bidir(&member.hash(), &stream_address, "member_of", "has_member")?;
    }
    Ok(stream_address)
}

pub fn handle_add_members(stream_address: HashString, members: Vec<member::Member>) -> ZomeApiResult<()> {
    for member in members {
        utils::link_entries_bidir(&member.hash(), &stream_address, "member_of", "has_member")?;
    }
    Ok(())
}


pub fn handle_get_my_streams() -> ZomeApiResult<utils::GetLinksLoadResult<Stream>> {
    utils::get_links_and_load_type(&get_my_member_id().hash(), "member_of")
}

pub fn handle_get_members(address: HashString) -> ZomeApiResult<utils::GetLinksLoadResult<member::Member>> {
    utils::get_links_and_load_type(&address, "has_member")
}

pub fn handle_get_messages(address: HashString) -> ZomeApiResult<utils::GetLinksLoadResult<message::Message>> {
    utils::get_links_and_load_type(&address, "message_in")
}

pub fn handle_get_subjects(address: HashString) -> ZomeApiResult<utils::GetLinksLoadResult<Subject>> {
    utils::get_links_and_load_type(&address, "stream_subject")
}

pub fn handle_post_message(stream_address: HashString, message_spec: message::MessageSpec, subjects: Vec<String>) -> ZomeApiResult<()> {

    let message = message::Message::from_spec(
        &message_spec,
        &"test author".to_string());

    let message_entry = Entry::App(
        AppEntryType::from("message"),
        AppEntryValue::from(message)
    );

    let message_addr = hdk::commit_entry(&message_entry)?;

    hdk::link_entries(&stream_address, &message_addr, "message_in")?;

    for subject in subjects {
        let subject_entry = Entry::App(
            AppEntryType::from("subject"),
            AppEntryValue::from(Subject{name: subject.to_owned(), stream_address: stream_address.clone()})
        );
        let subject_address = hdk::commit_entry(&subject_entry)?;
        hdk::link_entries(&subject_address, &message_addr, "message_in")?;
        hdk::link_entries(&stream_address, &subject_address, "stream_subject")?;
    }

    Ok(())
}

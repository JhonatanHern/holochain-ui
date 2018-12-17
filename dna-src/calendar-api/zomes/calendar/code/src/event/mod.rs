use hdk::holochain_core_types::{
    hash::HashString,
    entry::{
    	entry_type::AppEntryType,
    	AppEntryValue,
    	Entry
    },
    error::HolochainError,
    json::JsonString,
    dna::zome::entry_types::Sharing,
    cas::content::Address
};
use hdk::*;
use hdk::entry_definition::ValidatingEntryType;
use hdk::error::ZomeApiResult;

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Event {
    pub since: String,
    pub until: String,
}
impl Event {
    pub fn new(since:String,until:String) -> Event {
        Event {
            since: since,
            until: until,
        }
    }
}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GetLinksLoadElement<T> {
	pub address: HashString,
	pub entry: T
}
pub type GetLinksLoadResult<T> = Vec<GetLinksLoadElement<T>>;
pub fn handle_save_event( since:String,until:String ) -> ZomeApiResult<(Address)> {
	let new_event = Event::new("since".to_string(),"until".to_string());
	let entry = Entry::App(
		AppEntryType::from("event"),
		AppEntryValue::from(new_event)
		);
	hdk::debug(&entry);
    let event_address = hdk::commit_entry(&entry)?;
	hdk::debug(&event_address);
    // hdk::link_entries(&AGENT_ADDRESS, &event_address, "event")?;
    Ok(event_address)
}

pub fn handle_get_events(hash : HashString) -> ZomeApiResult<GetLinksLoadResult<Entry>> {
	let get_links_result = hdk::get_links(&hash,"event")?;

	Ok(get_links_result.addresses()
		.iter()
		.map(|address| {
			hdk::get_entry(address.to_owned())
			.map(|entry: Option<Entry>| {
				GetLinksLoadElement{
					address: address.to_owned(),
					entry: entry.unwrap()
				}
			})
		})
		.filter_map(Result::ok)
		.collect())
}


pub fn event_definition() -> ValidatingEntryType {
    entry!(
        name: "event",
        description: "event definition",
        sharing: Sharing::Public,
        native_type: Event,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: |_event: Event, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}

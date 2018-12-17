#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate holochain_core_types_derive;

use hdk::{
    error::ZomeApiResult,
    holochain_core_types::entry::Entry,
};

use hdk::holochain_core_types::{
    hash::HashString,
    cas::content::Address,
};

mod event;

define_zome! {
    entries: [
    	event::event_definition()
    ]
    genesis: || {
    	Ok(())
    }
    functions: {
		main (Public) {
			save_event: {
				inputs: | since : String , until : String |,
				outputs: |result: ZomeApiResult<Address>|,
				handler: event::handle_save_event
			}
			// get_events: {
			// 	inputs: | hash : HashString |,
			// 	outputs: |result: ZomeApiResult<event::GetLinksLoadResult<event::Event>> |,
			// 	handler: event::handle_get_events
			// }
    	}
    }
}

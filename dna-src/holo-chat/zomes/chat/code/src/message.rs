use hdk::holochain_core_types::error::HolochainError;
use hdk::holochain_core_types::json::JsonString;
use hdk::{
    self, 
    entry_definition::ValidatingEntryType,
};

use hdk::holochain_core_types::{
    dna::zome::entry_types::Sharing,
};


#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Message {
    pub timestamp: String,
    pub author: String,
    pub message_type: String,
    pub payload: String,
    pub meta: String,
}

pub fn message_definition() -> ValidatingEntryType {
    entry!(
        name: "message",
        description: "A generic message entry",
        sharing: Sharing::Public,
        native_type: Message,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_message: Message, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}

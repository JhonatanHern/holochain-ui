'use strict';
var module = {};
var x = new Map();
/*=============================================
=            Public Zome Functions            =
=============================================*/
function personasList() {
    var personas = query({
        Return: {
            Hashes: true,
            Entries: true
        },
        Constrain: {
            EntryTypes: ["persona"]
        }
    });
    var personasWithHash = [];
    personas.forEach(function (persona) {
        var personaWithHash = {
            "hash": persona.Hash,
            "persona": persona.Entry
        };
        personasWithHash.push(personaWithHash);
    });
    debug(personasWithHash);
    return personasWithHash;
}
function personaCreate(personaEntry) {
    debug('personaCreate');
    var personaHash = commit("persona", personaEntry);
    debug(personaHash);
    return personaHash;
}
function personaRead(personaHash) {
    debug(personaHash);
    debug(get(personaHash));
    var persona = get(personaHash);
    return persona;
}
function personaUpdate(params) {
    debug(params);
    var replaces = params.hash;
    var persona = params.persona;
    var personaHash = update("persona", persona, replaces);
    return personaHash;
}
function personaDelete(personaHash) {
    var result = remove(personaHash, 'No longer need this persona');
    return result;
}
/*=====  End of Public Zome Functions  ======*/
// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------
function bridgeGenesis(side, dna, appData) {
    debug(App.Name + ' Personas Bridged to: DNA: ' + dna);
    return true;
}
/**
 * Called only when your source chain is generated
 * @return {boolean} success
 */
function genesis() {
    return true;
}
// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------
/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {*} entry - the entry data to be set
 * @param {object} header - header for the entry containing properties EntryLink, Time, and Type
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateCommit(entryName, entry, header, pkg, sources) {
    switch (entryName) {
        case "persona":
            return true;
        case "persona_links":
            return true;
        default:
            // invalid entry name
            return false;
    }
}
/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {*} entry - the entry data to be set
 * @param {object} header - header for the entry containing properties EntryLink, Time, and Type
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validatePut(entryName, entry, header, pkg, sources) {
    switch (entryName) {
        case "persona":
            return true;
        case "persona_links":
            return true;
        default:
            return false;
    }
}
/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {*} entry - the entry data to be set
 * @param {object} header - header for the entry containing properties EntryLink, Time, and Type
 * @param {string} replaces - the hash for the entry being updated
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateMod(entryName, entry, header, replaces, pkg, sources) {
    switch (entryName) {
        case "persona":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        case "persona_links":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return false;
        default:
            // invalid entry name
            return false;
    }
}
/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {string} hash - the hash of the entry to remove
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateDel(entryName, hash, pkg, sources) {
    switch (entryName) {
        case "persona":
            return true;
        case "persona_links":
            return false;
        default:
            // invalid entry name
            return false;
    }
}
/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {string} baseHash - the hash of the base entry being linked
 * @param {?} links - ?
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateLink(entryName, baseHash, links, pkg, sources) {
    switch (entryName) {
        case "persona_links":
            return true;
        default:
            // invalid entry name
            return false;
    }
}
/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validatePutPkg(entryName) {
    return null;
}
/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateModPkg(entryName) {
    return null;
}
/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateDelPkg(entryName) {
    return null;
}
/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateLinkPkg(entryName) {
    return null;
}
module.exports = 0;
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { specs } from 'storybook-addon-specifications'
import { withNotes } from '@storybook/addon-notes'
import AutoCompleteProfileField from './autoCompleteProfileField'
import autoCompleteProfileFieldNotes from './autoCompleteProfileFieldNotes.md'
import { autoCompleteProfileFieldTests } from './autoCompleteProfileField.test'
import * as constants from '../../constants'

storiesOf('HoloVault/Profile/AutoComplete', module)
  .add('Autocomplete Profile Field not mapped', withNotes(autoCompleteProfileFieldNotes)(() => {
    specs(() => autoCompleteProfileFieldTests)
    let personas = constants.personas
    let profile = constants.exampleProfileNotMappedNoDefaults
    let field = constants.exampleProfileNotMappedNoDefaults.fields[0]

    return <AutoCompleteProfileField handleMappingChange={action('Select a Persona Field')} personas={personas} profile={profile} field={field} />
  }))
  .add('Autocomplete Profile Field not mapped but has matching persona value', withNotes(autoCompleteProfileFieldNotes)(() => {
    specs(() => autoCompleteProfileFieldTests)
    let personas = constants.personas
    let profile = constants.exampleProfileNotMapped
    let field = constants.exampleProfileNotMapped.fields[0]

    return <AutoCompleteProfileField handleMappingChange={action('Select a Persona Field')} personas={personas} profile={profile} field={field} />
  }))
  .add('Autocomplete Profile Field mapped to Persona data', withNotes(autoCompleteProfileFieldNotes)(() => {
    // specs(() => autoCompleteProfileFieldTests)
    let personas = constants.personas
    let profile = constants.exampleProfile
    let field = constants.exampleProfile.fields[0]

    return <AutoCompleteProfileField handleMappingChange={action('Select a Persona Field')} personas={personas} profile={profile} field={field} />
  }))

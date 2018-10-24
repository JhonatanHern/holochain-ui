import * as React from 'react'
import { mount, ReactWrapper, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as constants from '../../constants'
// import { Suggestion as SuggestionType } from '../../types/suggestion'
import FieldMapper, { Props } from './fieldMapper'
import { UsageType } from '../../types/profile'

configure({ adapter: new Adapter() })

export const fieldMapperTests = describe('FieldMapper', () => {

  let props: any// : Props
  let mountedFieldMapper: ReactWrapper<Props, {}> | undefined

  const fieldMapper = () => {
    if (!mountedFieldMapper) {
      mountedFieldMapper = mount(<FieldMapper {...props}/>)
    }
    return mountedFieldMapper
  }

  beforeEach(() => {
    mountedFieldMapper = undefined
  })

  // const mockFn = jest.fn()

  it('Does nothing if primary persona contains no fields with name equal to profileField.name', () => {
    props = {
      field: {
        name: 'not_a_match',
        displayName: 'Not Match',
        required: false,
        description: 'A profileField with a weird name that wont match',
        usage: UsageType.DISPLAY,
        schema: { 'type': 'string' }
      },
      profile: constants.exampleProfile,
      personas: constants.personas,
      selectedPersona: constants.personas[0]
    }
    // @ts-ignore
    expect(fieldMapper().find('AutoCompleteProfileField').instance().state.value).toEqual('')
  })

  it('Populates data field, persona field and field name field if a match is found in primary persona', () => {
    const selectedPersona = constants.personas[0]
    const field = constants.exampleProfile.fields[1] // first_name
    props = {
      field: field, // first_name
      profile: constants.exampleProfile,
      personas: constants.personas,
      selectedPersona
    }
    expect(fieldMapper().find('TextField[name="persona"]').props().value).toEqual(selectedPersona.name)
    expect(fieldMapper().find('TextField[name="field"]').props().value).toEqual(selectedPersona.fields[0].name)
    // @ts-ignore
    expect(fieldMapper().find('AutoCompleteProfileField').instance().state.value).toEqual(selectedPersona.fields[0].data)
  })
  //
  // it('has the correct autocomplete values in data, persona and field fields if no match found', () => {
  //   const selectedPersona = constants.personas[0]
  //   const field = constants.exampleProfile.fields[1] // first_name
  //   props = {
  //     field, // first_name
  //     profile: constants.exampleProfile,
  //     personas: constants.personas,
  //     selectedPersona
  //   }
  //   expect(true)
  //   // not sure how to test this yet
  // })
  //
  // it('populates the persona and field fields when selecting an autocomplete in the data field', () => {
  //   const selectedPersona = constants.personas[0]
  //   const field = constants.exampleProfile.fields[1] // first_name
  //   props = {
  //     field, // first_name
  //     profile: constants.exampleProfile,
  //     personas: constants.personas,
  //     selectedPersona
  //   }
  //
  //   const autoCompleteProfileField = fieldMapper().find('AutoCompleteProfileField')
  //   autoCompleteProfileField.find('input[name="name"]').simulate('change', { target: { value: 'P' } })
  //   autoCompleteProfileField.find('input[name="name"]').simulate('focus')
  //   autoCompleteProfileField.find('MenuItem').first().simulate('click')
  //   autoCompleteProfileField.find('input[name="name"]').simulate('blur')
  //
  //   expect(fieldMapper().find('TextField[name="persona"]').props().value).toEqual(selectedPersona.name)
  //   expect(fieldMapper().find('TextField[name="field"]').props().value).toEqual(selectedPersona.fields[0].name)
  // })
  //
  // // ---------------------------------------------------------------
  //
  // it('calls displays new badge and calls updateNewField if unmapped data is input to autocomplete', () => {
  //   const selectedPersona = constants.personas[0]
  //   props = {
  //     field: {
  //       name: 'not_a_match',
  //       displayName: 'Not Match',
  //       required: false,
  //       description: 'A profileField with a weird name that wont match',
  //       usage: UsageType.DISPLAY,
  //       schema: { 'type': 'string' }
  //     },
  //     profile: constants.exampleProfile,
  //     personas: constants.personas,
  //     selectedPersona,
  //     updateNewField: mockFn
  //   }
  //
  //   const newData = 'newDataString'
  //   const autoCompleteProfileField = fieldMapper().find('AutoCompleteProfileField')
  //   autoCompleteProfileField.find('input[name="name"]').simulate('change', { target: { value: newData } })
  //
  //   expect(props.updateNewField).toBeCalled()
  //   expect(true) // new badge to be set on data field
  //   expect(true) // new badge to be set on field field
  //   expect(fieldMapper().find('TextField[name="persona"]').props().value).toEqual(selectedPersona.name)
  //   expect(fieldMapper().find('TextField[name="field"]').props().value).toEqual(props.profileField.name)
  // })
  //
  // it('Detects a field naming collision and sets conflict badge and calls udateConflictFlag', () => {
  //   const selectedPersona = constants.personas[0]
  //   const field = constants.exampleProfile.fields[1] // first_name
  //
  //   const newData = 'newDataString'
  //   const autoCompleteProfileField = fieldMapper().find('AutoCompleteProfileField')
  //   autoCompleteProfileField.find('input[name="name"]').simulate('change', { target: { value: newData } })
  //
  //   props = {
  //     field, // first_name
  //     profile: constants.exampleProfile,
  //     personas: constants.personas,
  //     selectedPersona,
  //     udateConflictFlag: mockFn
  //   }
  //
  //   expect(true) // conflict badge to be visible
  //   expect(true) // sets a useful error message
  //   expect(props.udateConflictFlag).toBeCalled()
  // })
  //
  // it('detects a resolved conflict by creating a new persona', () => {
  //   expect(true)
  // })
  //
  // it('detects a resolved conflict by changing the field name', () => {
  //   expect(true)
  // })

})

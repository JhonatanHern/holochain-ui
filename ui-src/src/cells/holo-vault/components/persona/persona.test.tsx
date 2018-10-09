import * as React from 'react'
import Persona, { State, Props } from './persona'
import { Persona as PersonaType } from '../../types/persona'
import { mount, ReactWrapper, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import CreateStore from '../../../../store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

let store = CreateStore()
configure({ adapter: new Adapter() })

export const personaTests = describe('Looking after your Personas', () => {

  let props: Props
  let mountedPersona: ReactWrapper<Props, State> | undefined

  const personaView = () => {
    if (!mountedPersona) {
      mountedPersona = mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><Persona {...props}/></MemoryRouter></Provider>)
    }
    return mountedPersona
  }

  beforeEach(() => {
    mountedPersona = undefined
  })

  const mockFn = jest.fn()

  it('Create a Persona by adding new fields and values, this will send a Persona to Holochain', () => {
    let newPersona: PersonaType = {
      name: '',
      hash: '',
      fields: [
      ]
    }

    props = {
      currentPersona: newPersona,
      title: 'New - Persona',
      create: mockFn,
      update: mockFn
    }

    const testPersona = {
      hash: '',
      name: 'Personal',
      fields: [
          { name: 'firstName', data: 'Phil' },
          { name: 'lastName', data: 'Beadle' }
      ]
    }

    personaView().find('input[name="personaName"]').simulate('change', { target: { value: 'Personal' } })
    personaView().find('button[name="addField"]').simulate('click')
    personaView().find('input[name="fieldName0"]').simulate('change', { target: { value: 'firstName' } })
    personaView().find('input[name="fieldValue0"]').simulate('change', { target: { value: 'Phil' } })
    personaView().find('button[name="addField"]').simulate('click')
    personaView().find('input[name="fieldName1"]').simulate('change', { target: { value: 'lastName' } })
    personaView().find('input[name="fieldValue1"]').simulate('change', { target: { value: 'Beadle' } })
    personaView().find('button[name="submitPersona"]').simulate('click')
    let createdPersona: PersonaType = (personaView().find('Persona').instance().state as State).persona
    expect(createdPersona).toEqual(testPersona)
    expect(props.create).toBeCalled()
  })

  it('Edit a Persona by changing the name and adding new fields and values, this will send an updated Persona to Holochain', () => {
    let editPersona: PersonaType = {
      hash: 'hash11111',
      name: 'Personal',
      fields: [
          { name: 'firstName', data: 'Phil' },
          { name: 'lastName', data: 'Beadle' }
      ]
    }

    props = {
      currentPersona: editPersona,
      title: 'Edit - Persona',
      create: mockFn,
      update: mockFn
    }

    const testPersona: PersonaType = {
      hash: 'hash11111',
      name: 'Edited Persona Name',
      fields: [
          { name: 'editfirstName', data: 'Philip' },
          { name: 'editlastName', data: 'Holo' },
          { name: 'extra', data: 'row' }
      ]
    }

    personaView().find('input[name="personaName"]').simulate('change', { target: { value: 'Edited Persona Name' } })
    personaView().find('input[name="fieldName0"]').simulate('change', { target: { value: 'editfirstName' } })
    personaView().find('input[name="fieldValue0"]').simulate('change', { target: { value: 'Philip' } })
    personaView().find('input[name="fieldName1"]').simulate('change', { target: { value: 'editlastName' } })
    personaView().find('input[name="fieldValue1"]').simulate('change', { target: { value: 'Holo' } })
    personaView().find('button[name="addField"]').simulate('click')
    personaView().find('input[name="fieldName2"]').simulate('change', { target: { value: 'extra' } })
    personaView().find('input[name="fieldValue2"]').simulate('change', { target: { value: 'row' } })
    personaView().find('button[name="submitPersona"]').simulate('click')
    let editedPersona: PersonaType = (personaView().find('Persona').instance().state as State).persona
    expect(editedPersona).toEqual(testPersona)
  })
})

import * as React from 'react'
import { storiesOf } from '@storybook/react'
// import { specs } from 'storybook-addon-specifications'
import FieldMapper from './fieldMapper'
// import { fieldMapperTests } from './fieldMapper.test'
import * as constants from '../../constants'

storiesOf('HoloVault/Profile/FieldMapper', module)
  .add('Renders with a mapped profile field and personas', (() => {
    // specs(() => fieldMapperTests)

    const props = {
      profileField: constants.exampleProfile.fields[0],
      profile: constants.exampleProfile,
      personas: constants.personas
    }

    return <FieldMapper {...props} />
  }))
  .add('Populates an unmapped Profile with data field, persona field and field name field if a match is found in any persona', (() => {
    // specs(() => fieldMapperTests)

    const props = {
      profileField: constants.exampleProfileNotMapped.fields[0],
      profile: constants.exampleProfileNotMapped,
      personas: constants.personas
    }

    return <FieldMapper {...props} />
  }))

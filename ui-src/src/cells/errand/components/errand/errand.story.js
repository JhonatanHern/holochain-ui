import * as React from 'react'
// import {Provider} from 'react-redux'
import { storiesOf } from "@storybook/react";
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router'
import { withNotes } from '@storybook/addon-notes'
import {configure} from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import displayErrandItems from './displayErrandItems.md'
// import newChat from './newChat.md'
// import CreateStore from '../../../../store'
// import  * as constants from '../../constants'
// import{Message as MessageType} from '../../types/message'
// import Channels from './channels'
// import { channelsTests } from './channels.test'
import Errand from './errand'

import CreateStore from '../../../../store'

let store = CreateStore()

configure({adapter: new Adapter()})
// let store = CreateStore()

function StartComponent () {
    return (
      <div>Starting point</div>
    )
}
const boardData =  {
  "lanes": [
    {
      "id": "TASK",
      "title": "Planned Tasks",
      "label": "20/70",
      "style": {"width": 280},
      "cards": [
        {
        "id": "Plan1",
          "title": "Buy milk",
          "label": "15 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "2 Gallons of milk at the Deli store"
        },
        {
          "id": "Plan2",
          "title": "Dispose Garbage",
          "label": "10 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Sort out recyclable and waste as needed"
        },
        {
          "id": "Plan3",
          "title": "Write Blog",
          "label": "30 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Can AI make memes?"
        },
        {
          "id": "Plan4",
          "title": "Pay Rent",
          "label": "5 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Transfer to bank account"
        }
      ]
    },
    {
      "id": "WIP",
      "title": "Work In Progress",
      "label": "10/20",
      "style": {"width": 280},
      "cards": [
        {
          "id": "Wip1",
          "title": "Clean House",
          "label": "30 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses"
        }
      ]
    },
    {
      "id": "BLOCKED",
      "title": "Blocked",
      "label": "0/0",
      "style": {"width": 280},
      "cards": []
    },
    {
      "id": "COMPLETED",
      "title": "Completed",
      "style": {"width": 280},
      "label": "2/5",
      "cards": [
        {
          "id": "Completed1",
          "title": "Practice Meditation",
          "label": "15 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Use Headspace app"
        },
        {
          "id": "Completed2",
          "title": "Maintain Daily Journal",
          "label": "15 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Use Spreadsheet for now"
        }
      ]
    },
    {
      "id": "REPEAT",
      "title": "Repeat",
      "style": {"width": 280},
      "label": "1/1",
      "cards": [
        {
          "id": "Repeat1",
          "title": "Morning Jog",
          "label": "30 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Track using fitbit"
        }
      ]
    },
    {
      "id": "ARCHIVED",
      "title": "Archived",
      "style": {"width": 280},
      "label": "1/1",
      "cards": [
        {
          "id": "Archived1",
          "title": "Go Trekking",
          "label": "300 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Completed 10km on cycle"
        }
      ]
    },
    {
      "id": "ARCHIVED2",
      "title": "Archived2",
      "style": {"width": 280},
      "label": "1/1",
      "cards": [
        {
          "id": "Archived1",
          "title": "Go Trekking",
          "label": "300 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Completed 10km on cycle"
        }
      ]
    },
    {
      "id": "ARCHIVED3",
      "title": "Archived3",
      "style": {"width": 280},
      "label": "1/1",
      "cards": [
        {
          "id": "Archived1",
          "title": "Go Trekking",
          "label": "300 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Completed 10km on cycle"
        }
      ]
    }
  ]
}

storiesOf('Errand', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  // .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Show Errand Board', withNotes(displayErrandItems) (() => {
      return (<Provider store={store}><MemoryRouter initialEntries={['/']}><Errand boardData={boardData}/></MemoryRouter></Provider>)
  }))

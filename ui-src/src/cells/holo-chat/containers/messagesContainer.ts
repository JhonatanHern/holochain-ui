
import { connect } from 'react-redux'
import Messages from '../components/messages/messages'
// import  * as constants from '../constants'
// import {HoloChatState} from '../reducer'
import { Dispatch } from 'redux'
import { modelMessagesToViewMessages } from '../types/view/message'
import { MessageSpec } from '../types/model/message'
import {
	GetMessages,
	GetMembers,
	GetProfile,
	PostMessage
} from '../actions'

const mapStateToProps = (state: any) => {
  return {
    messages: modelMessagesToViewMessages(state.holoChat.currentMessages, state.holoChat.activeChannelMembers, state.holoChat.myHash),
    channel: state.holoChat.activeChannel,
    members: state.holoChat.activeChannelMembers,
    myHash: state.holoChat.myHash
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getMessages: (channelSubjectAddress: string) => dispatch(GetMessages.create({ channelSubjectAddress: channelSubjectAddress })),
    getMembers:  (channelUUID: string) => dispatch(GetMembers.create({ channelHash: channelUUID })),
    whoami: () => dispatch(GetProfile.create({})),
    sendMessage: (payload: {message: MessageSpec, channelAddress: string, subjects: [string]}) => dispatch(PostMessage.create(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)

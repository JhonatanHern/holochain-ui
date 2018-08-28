
import { connect } from 'react-redux'
import Messages from '../components/messages/messages'
import  * as constants from '../constants'
import {
  messagesList
} from '../actions'

const mapStateToProps = state => {
  return {
    messages: constants.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    messagesList: () => {
      dispatch(messagesList())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)

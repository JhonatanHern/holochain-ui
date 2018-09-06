import {Message as ModelMessage} from '../model/message'
import {Identity} from '../../reducer'

export type Message = ModelMessage & { type: MessageType } | any

export function modelMessagesToViewMessages(messages: Array<ModelMessage>, members: Array<Identity>): Array<Message> {
	
	const memberMap = members.reduce((obj, item) => {
     obj[item.hash] = item
     return obj
  }, {})

  return messages.map((m) => {
  	return {
  		...m, 
  		author: memberMap[m.author!],
  		type: MessageType.CHAT,
  		replies: []
  	}
  	}) as Array<Message>
}


export enum MessageType {
	CHAT,
	IDEA
}
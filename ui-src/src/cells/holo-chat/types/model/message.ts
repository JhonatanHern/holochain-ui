
export interface MessageSpec {
  message_type: string,
  payload: string,
  meta: string
}

export interface Message {
  author: string,
  timestamp: number,
  message_type: string,
  payload: string,
  meta: string
}

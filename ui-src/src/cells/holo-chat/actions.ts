import { createAction } from 'typesafe-actions'
import { createHolochainAsyncAction } from '../../utils/holochainWebsocketsActions'

import { Message, MessageSpec } from './types/model/message'
import { Channel, ChannelSpec } from './types/model/channel'
import { Identity } from './types/model/identity'
import { Subject } from './types/model/subject'

/*===============================================
=            Action Type Definitions            =
===============================================*/

/*----------  Holochain actions  ----------*/

export const Init = createHolochainAsyncAction<any, any>('holo-chat', 'chat', 'main', 'create_channel')

export const CreateChannel = createHolochainAsyncAction<ChannelSpec, string>('holo-chat', 'chat', 'main', 'create_channel')

export const AddMembers = createHolochainAsyncAction<{channelHash: string, members: Array<string>}, boolean>('holo-chat', 'chat', 'main', 'add_members')

export const GetMyChannels = createHolochainAsyncAction<any, Array<Channel>>('holo-chat', 'chat', 'main', 'get_my_channels')

export const GetSubjects = createHolochainAsyncAction<{channelAddress: string}, Array<Subject>>('holo-chat', 'chat', 'main', 'get_subjects')

export const GetAllMembers = createHolochainAsyncAction<any, Array<Channel>>('holo-chat', 'chat', 'main', 'get_all_members')

export const GetMembers = createHolochainAsyncAction<{channelHash: string}, Array<Identity>>('holo-chat', 'chat', 'main', 'get_members')

export const PostMessage = createHolochainAsyncAction<{channelAddress: string, subjects: [string], message: MessageSpec}, string>('holo-chat', 'chat', 'main', 'post_message')

export const GetMessages = createHolochainAsyncAction<{channelSubjectAddress: string}, Array<Message>>('holo-chat', 'chat', 'main', 'get_messages')

export const GetProfile = createHolochainAsyncAction<any, string>('holo-chat', 'chat', 'main', 'get_profile')

// export const GetIdentity = createHolochainAsyncAction<string, Identity>('holo-chat', 'users', 'main', 'getIdentity')

// export const SetIdentity = createHolochainAsyncAction<IdentitySpec, boolean>('holo-chat', 'users', 'main', 'setIdentity')

/*----------  Non-holochain actions  ----------*/

export const SetActiveChannel = createAction('holochat/setActiveChannel', resolve => {
  return (channel: Channel) => resolve(channel)
})

/*=====  End of Action Type Definitions  ======*/

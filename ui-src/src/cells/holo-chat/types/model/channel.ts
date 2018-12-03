
export interface Member {
  id: string
}

export interface ChannelSpec {
  initial_members: Array<Member>,
  name: string,
  description: string,
  public: boolean
}

export interface Channel {
  hash: string,
  isPublic: boolean,
  name?: string,
  description?: string
}

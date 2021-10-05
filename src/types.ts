export type User = {
    id: string;
    username: string;
    updated_at: string,
    created_at: string,
}

export type Server = {
    id: string;
    name: string;
    owner_id: string;
    updated_at: string,
    created_at: string,
}

export type Channel = {
    id: string,
    name: string,
    server_id: string,
    updated_at: string,
    created_at: string,
}

export type Message = {
    id: string,
    content: string,
    channel_id: string,
    user: User,
    updated_at: string,
    created_at: string,
}

export enum WebsocketMessageType {
    Ping = "Ping",
    Pong = "Pong",
    Identify = "Identify",
    Ready = "Ready",
    NewMessage = "NewMessage",
    NewChannel = "NewChannel",
    NewServer = "NewServer",
    NewUser = "NewUser",
}

export type WebsocketMessage = {
    type: WebsocketMessageType.Ping,
} | {
    type: WebsocketMessageType.Pong,
} | {
    type: WebsocketMessageType.Identify,
    payload: WebsocketIdentify
} | {
    type: WebsocketMessageType.Ready,
    payload: WebsocketReady
} | {
    type: WebsocketMessageType.NewMessage,
    payload: WebsocketNewMessage
} | {
    type: WebsocketMessageType.NewChannel,
    payload: WebsocketNewChannel
} | {
    type: WebsocketMessageType.NewServer,
    payload: WebsocketNewServer,
} | {
    type: WebsocketMessageType.NewUser,
    payload: WebsocketNewUser,
}

export type WebsocketIdentify = {
    bearer: string,
}


export type WebsocketReady = {
}

export type WebsocketNewMessage = {
    message: Message,
}

export type WebsocketNewChannel = {
    channel: Channel,
}

export type WebsocketNewServer = {
    server: Server,
    channels: Channel[],
    users: User[],
}

export type WebsocketNewUser = {
    server_id: string,
    user: User,
}

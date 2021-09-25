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
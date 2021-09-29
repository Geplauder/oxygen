import { Middleware } from "redux";
import { RootState } from "../app/store";
import { addChannel } from "../features/channels/channelsSlice";
import { hydrate, loginAsync } from "../features/login/loginSlice";
import { addMessage } from "../features/messages/messagesSlice";
import { addServer } from "../features/servers/serversSlice";
import { setIsConnected } from "../features/user/userSlice";
import { Channel, Message, Server } from "../types";

enum WebsocketMessageType {
    Ping = "Ping",
    Pong = "Pong",
    Identify = "Identify",
    Ready = "Ready",
    NewMessage = "NewMessage",
    NewChannel = "NewChannel",
    NewServer = "NewServer",
}

type WebsocketMessage = {
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
}

type WebsocketIdentify = {
    bearer: string,
}


type WebsocketReady = {
}

type WebsocketNewMessage = {
    message: Message,
}

type WebsocketNewChannel = {
    channel: Channel,
}

type WebsocketNewServer = {
    server: Server,
}

export const websocketMiddleware: Middleware<unknown, RootState> = storeApi => {
    let socket: WebSocket | null = null;

    return next => action => {
        switch (action.type) {
            // Connect websocket when either
            //   - the user logs in
            //   - the user is already logged in and the token is added to the store
            case loginAsync.fulfilled.type:
            case hydrate.type: {
                const token = action.payload.token;

                socket = new WebSocket('ws://localhost:8000/ws');

                socket.onmessage = (event) => {
                    const message: WebsocketMessage = JSON.parse(event.data);

                    switch (message.type) {
                        case WebsocketMessageType.Ready: {
                            storeApi.dispatch(setIsConnected(true));

                            break;
                        }
                        case WebsocketMessageType.NewMessage: {
                            storeApi.dispatch(addMessage(message.payload.message));

                            break;
                        }
                        case WebsocketMessageType.NewChannel: {
                            storeApi.dispatch(addChannel(message.payload.channel));

                            break;
                        }
                        case WebsocketMessageType.NewServer: {
                            storeApi.dispatch(addServer(message.payload.server));
                        }
                    }
                };

                socket.onopen = () => {
                    const message: WebsocketMessage = {
                        type: WebsocketMessageType.Identify,
                        payload: {
                            bearer: token,
                        }
                    };

                    socket?.send(JSON.stringify(message));

                    setInterval(() => {
                        const message: WebsocketMessage = {
                            type: WebsocketMessageType.Ping
                        };

                        socket?.send(JSON.stringify(message));
                    }, 15 * 1000);
                };

                break;
            }
        }

        return next(action);
    }
}

import { Middleware } from "redux";
import { RootState } from "../app/store";
import { getChannelsAsync } from "../features/channels/channelsSlice";
import { hydrate, loginAsync } from "../features/login/loginSlice";
import { addMessage } from "../features/messages/messagesSlice";
import { setIsConnected } from "../features/user/userSlice";
import { Channel, Message } from "../types";

enum WebsocketMessageType {
    Bootstrap = "Bootstrap",
    NewMessage = "NewMessage",
}

type WebsocketMessage = {
    type: WebsocketMessageType.Bootstrap,
    payload: WebsocketBootstrap
} | {
    type: WebsocketMessageType.NewMessage,
    payload: WebsocketNewMessage
}

type WebsocketBootstrap = {
    channels: string[],
}

type WebsocketNewMessage = {
    message: Message,
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

                socket = new WebSocket(`ws://localhost:8000/ws?bearer=${token}`);

                socket.onmessage = (event) => {
                    const message: WebsocketMessage = JSON.parse(event.data);

                    switch (message.type) {
                        case WebsocketMessageType.NewMessage: {
                            storeApi.dispatch(addMessage(message.payload.message));

                            break;
                        }
                    }
                };

                // Update store to reflect that websocket is in proper state
                const waitForSocketConnection = () => {
                    setTimeout(() => {
                        if (socket === null || socket.readyState !== WebSocket.OPEN) {
                            waitForSocketConnection();
                        } else {
                            storeApi.dispatch(setIsConnected(true));
                        }
                    }, 100);
                };

                waitForSocketConnection();

                break;
            }
            case getChannelsAsync.fulfilled.type: {
                const payload = action.payload as Channel[];

                const message: WebsocketMessage = {
                    type: WebsocketMessageType.Bootstrap,
                    payload: {
                        channels: payload.map(x => x.id),
                    }
                };

                socket?.send(JSON.stringify(message));

                break;
            }
        }

        return next(action);
    }
}

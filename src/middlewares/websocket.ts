import { Middleware } from "redux";
import { RootState } from "../app/store";
import { hydrate, loginAsync } from "../features/login/loginSlice";
import { addMessage } from "../features/messages/messagesSlice";
import { setIsConnected } from "../features/user/userSlice";
import { Message } from "../types";

enum WebsocketMessageType {
    Identify = "Identify",
    Ready = "Ready",
    NewMessage = "NewMessage",
}

type WebsocketMessage = {
    type: WebsocketMessageType.Identify,
    payload: WebsocketIdentify
} | {
    type: WebsocketMessageType.Ready,
    payload: WebsocketReady
} | {
    type: WebsocketMessageType.NewMessage,
    payload: WebsocketNewMessage
}

type WebsocketIdentify = {
    bearer: string,
}


type WebsocketReady = {
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

                socket = new WebSocket('ws://localhost:8000/ws');

                socket.onmessage = (event) => {
                    const message: WebsocketMessage = JSON.parse(event.data);

                    switch (message.type) {
                        case WebsocketMessageType.NewMessage: {
                            storeApi.dispatch(addMessage(message.payload.message));

                            break;
                        }
                        case WebsocketMessageType.Ready: {
                            storeApi.dispatch(setIsConnected(true));

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
                            const message: WebsocketMessage = {
                                type: WebsocketMessageType.Identify,
                                payload: {
                                    bearer: token,
                                }
                            };
            
                            socket?.send(JSON.stringify(message));
                        }
                    }, 100);
                };

                waitForSocketConnection();

                break;
            }
        }

        return next(action);
    }
}

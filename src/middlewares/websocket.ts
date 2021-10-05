import { Middleware } from "redux";
import { RootState } from "../app/store";
import { hydrate, invalidateToken, loginAsync } from "../features/auth/authSlice";
import { GeplauderWebsocket } from "../utility/geplauderWebsocket";

export const websocketMiddleware: Middleware<unknown, RootState> = storeApi => {
    const websocket = new GeplauderWebsocket('ws://localhost:8000/ws', storeApi);

    return next => action => {
        switch (action.type) {
            // Connect websocket when either
            //   - the user logs in
            //   - the user is already logged in and the token is added to the store
            case loginAsync.fulfilled.type:
            case hydrate.type: {
                const token = action.payload.token;

                if (!token) {
                    break;
                }

                socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_BASE_URL + 'ws');

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

                            for (const channel of message.payload.channels) {
                                storeApi.dispatch(addChannel(channel));
                            }

                            for (const user of message.payload.users) {
                                storeApi.dispatch(addUser({ serverId: message.payload.server.id, user }));
                            }

                            break;
                        }
                        case WebsocketMessageType.NewUser: {
                            storeApi.dispatch(addUser({ serverId: message.payload.server_id, user: message.payload.user }));

                            break;
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

                socket.onclose = () => {
                    store.dispatch(setIsWebsocketClosed(true));
                }

                break;
            }
            case invalidateToken.type: {
                websocket.disconnect();
                break;
            }
        }

        return next(action);
    }
}

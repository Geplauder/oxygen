import { Middleware } from "redux";
import { addMessage } from "../features/messages/messagesSlice";
import { setIsConnected } from "../features/user/userSlice";
import { Channel } from "../types";

// TODO: Cleanup login flow
// TODO: Improve action handling in websocketMiddleware
// TODO: Add typings for websocket related data

export const websocketMiddleware: Middleware = storeApi => {
    let socket: WebSocket | null = null;

    return next => action => {
        switch (action.type) {
            case "login/connectToWebsocket": {
                socket = new WebSocket(`ws://localhost:8000/ws?bearer=${storeApi.getState().login.token}`);

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);

                    storeApi.dispatch(addMessage(data));
                };

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
            case "channels/getChannelsAsync/fulfilled": {
                const payload = action.payload as Channel[];

                socket?.send(JSON.stringify({
                    channels: payload.map(x => x.id),
                }));

                break;
            }
        }

        return next(action);
    }
}

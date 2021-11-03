import { Middleware } from "redux";
import { RootState } from "../app/store";
import { hydrate, invalidateToken, loginAsync } from "../features/auth/authSlice";
import { startTyping } from "../features/channels/channelsSlice";
import { WebsocketMessageType } from "../types";
import { GeplauderWebsocket } from "../utility/geplauderWebsocket";

export const websocketMiddleware: Middleware<unknown, RootState> = storeApi => {
    const websocket = new GeplauderWebsocket(process.env.VITE_WEBSOCKET_BASE_URL + 'ws', storeApi);

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

                // Check that the websocket is not connected already, otherwise disconnect it
                websocket.disconnect();
                websocket.setToken(token);
                websocket.connect();
                break;
            }
            case invalidateToken.type: {
                websocket.disconnect();
                break;
            }
            case startTyping.type: {
                const channel = action.payload;
                websocket.sendMessage({
                    type: WebsocketMessageType.StartTyping,
                    payload: {
                        channel_id: channel,
                    }
                });
                break;
            }
        }

        return next(action);
    }
}

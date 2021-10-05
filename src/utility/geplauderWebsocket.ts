import { MiddlewareAPI } from "redux";
import { addChannel } from "../features/channels/channelsSlice";
import { addMessage } from "../features/messages/messagesSlice";
import { addServer } from "../features/servers/serversSlice";
import { setIsConnected, setIsWebsocketClosed } from "../features/user/userSlice";
import { addUser } from "../features/users/usersSlice";
import { WebsocketMessage, WebsocketMessageType } from "../types";

export class GeplauderWebsocket {
    private websocketUrl: string;
    private websocket: WebSocket | null = null;

    private storeApi: MiddlewareAPI;
    private token: string | null = null;

    private heartbeatInterval: NodeJS.Timer | null = null;

    public constructor(websocketUrl: string, storeApi: MiddlewareAPI) {
        this.websocketUrl = websocketUrl;
        this.storeApi = storeApi;
    }

    public connect(token: string): void {
        if (this.websocket !== null) {
            this.disconnect();
        }

        this.token = token;

        this.websocket = new WebSocket(this.websocketUrl);
        this.websocket.onopen = (event) => this.onOpen(event);
        this.websocket.onclose = (event) => this.onClose(event);
        this.websocket.onmessage = (event) => this.onMessage(event);
    }

    public disconnect(): void {
        if (this.heartbeatInterval !== null) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }

        if (this.websocket !== null) {
            this.websocket.close();
            this.websocket = null;
        }
    }

    private onMessage(event: MessageEvent): void {
        const message: WebsocketMessage = JSON.parse(event.data);

        switch (message.type) {
            case WebsocketMessageType.Ready: {
                this.storeApi.dispatch(setIsConnected(true));

                break;
            }
            case WebsocketMessageType.NewMessage: {
                this.storeApi.dispatch(addMessage(message.payload.message));

                break;
            }
            case WebsocketMessageType.NewChannel: {
                this.storeApi.dispatch(addChannel(message.payload.channel));

                break;
            }
            case WebsocketMessageType.NewServer: {
                this.storeApi.dispatch(addServer(message.payload.server));

                for (const channel of message.payload.channels) {
                    this.storeApi.dispatch(addChannel(channel));
                }

                for (const user of message.payload.users) {
                    this.storeApi.dispatch(addUser({ serverId: message.payload.server.id, user }));
                }

                break;
            }
            case WebsocketMessageType.NewUser: {
                this.storeApi.dispatch(addUser({ serverId: message.payload.server_id, user: message.payload.user }));

                break;
            }
        }
    }

    private onOpen(event: Event) {
        if (this.token === null) {
            console.error('No token provided.');

            return;
        }

        if (this.websocket === null) {
            return;
        }

        const message: WebsocketMessage = {
            type: WebsocketMessageType.Identify,
            payload: {
                bearer: this.token,
            }
        };

        this.websocket.send(JSON.stringify(message));

        this.heartbeatInterval = setInterval(() => {
            const message: WebsocketMessage = {
                type: WebsocketMessageType.Ping
            };

            this.websocket?.send(JSON.stringify(message));
        }, 15 * 1000);
    }

    private onClose(event: CloseEvent) {
        this.storeApi.dispatch(setIsWebsocketClosed(true));
    }
}

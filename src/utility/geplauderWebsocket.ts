import { MiddlewareAPI } from "redux";
import { addChannel, deleteChannelsForServer } from "../features/channels/channelsSlice";
import { addMessage, deleteMessagesForChannel } from "../features/messages/messagesSlice";
import { addServer, deleteServer, getServersAsync } from "../features/servers/serversSlice";
import { getUserAsync, setIsConnected, setIsWebsocketClosed } from "../features/user/userSlice";
import { addUser, deleteUserForServer, deleteUsersForServer } from "../features/users/usersSlice";
import { WebsocketMessage, WebsocketMessageType } from "../types";

export class GeplauderWebsocket {
    private websocketUrl: string;
    private websocket: WebSocket | null = null;

    private storeApi: MiddlewareAPI;
    private token: string | null = null;

    private heartbeatInterval: NodeJS.Timer | null = null;

    private shouldReconnect = true;

    public constructor(websocketUrl: string, storeApi: MiddlewareAPI) {
        this.websocketUrl = websocketUrl;
        this.storeApi = storeApi;
    }

    /**
     * Connects to the websocket server.
     *
     * Automatically tries to reconnect on errors, unless {@link GeplauderWebsocket.disconnect} is called.
     */
    public connect(): void {
        if (this.websocket !== null) {
            this.disconnect();
        }

        if (this.token === null) {
            console.error('No token provided.');

            return;
        }

        this.shouldReconnect = true;

        this.websocket = new WebSocket(this.websocketUrl);
        this.websocket.onopen = () => this.onOpen();
        this.websocket.onclose = (event) => this.onClose(event);
        this.websocket.onerror = (event) => this.onError(event);
        this.websocket.onmessage = (event) => this.onMessage(event);
    }

    public disconnect(): void {
        this.shouldReconnect = false;

        if (this.heartbeatInterval !== null) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }

        if (this.websocket !== null) {
            this.websocket.close();
            this.websocket = null;
        }
    }

    public setToken(token: string): void {
        this.token = token;
    }

    private onMessage(event: MessageEvent): void {
        const message: WebsocketMessage = JSON.parse(event.data);

        switch (message.type) {
            case WebsocketMessageType.Ready: {
                this.storeApi.dispatch(setIsConnected(true));

                this.storeApi.dispatch(getUserAsync() as any);
                this.storeApi.dispatch(getServersAsync() as any);

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
            case WebsocketMessageType.DeleteServer: {
                const channels = this.storeApi.getState().channels.channels[message.payload.server_id];

                this.storeApi.dispatch(deleteServer(message.payload.server_id));
                this.storeApi.dispatch(deleteChannelsForServer(message.payload.server_id));
                this.storeApi.dispatch(deleteUsersForServer(message.payload.server_id));

                for (const channel of channels) {
                    this.storeApi.dispatch(deleteMessagesForChannel(channel.id));
                }

                break;
            }
            case WebsocketMessageType.DeleteUser: {
                this.storeApi.dispatch(deleteUserForServer({ user_id: message.payload.user_id, server_id: message.payload.server_id }));

                break;
            }
        }
    }

    private onOpen() {
        if (this.token === null) {
            console.error('No token provided.');

            return;
        }

        if (this.websocket === null) {
            return;
        }

        this.storeApi.dispatch(setIsWebsocketClosed(false));

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
        console.error('Websocket close: ', event);

        this.storeApi.dispatch(setIsWebsocketClosed(true));

        if (this.shouldReconnect === false) {
            return;
        }

        // TODO: Add some kind of exponential backoff
        setTimeout(() => {
            this.connect();
        }, 1 * 1000);
    }

    private onError(event: Event) {
        console.error('Websocket error: ', event);

        // Close instead of disconnect to automatically reconnect
        this.websocket?.close();
    }
}

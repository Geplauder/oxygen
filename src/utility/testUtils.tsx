import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { rootReducer, rootMiddleware, RootState } from '../app/store';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import faker from 'faker';
import { Channel, Server, ServerFlags, User } from '../types';

type DummyStoreOptions = {
    userIsOwner?: boolean,
    serverIsVerified?: boolean,
    isConnected?: boolean,
    isWebsocketClosed?: boolean,
    userIsTyping?: boolean,
};

export function getDummyStore({ userIsOwner = true, serverIsVerified = false, isConnected = true, isWebsocketClosed = false, userIsTyping = false }: DummyStoreOptions = {}): { dummyData: { user: User, server: Server, firstChannel: Channel, secondChannel: Channel }, preloadedState: Partial<RootState> } {
    const user = {
        id: faker.datatype.uuid(),
        username: faker.name.firstName(),
        created_at: faker.date.past().toString(),
        updated_at: faker.date.past().toString(),
    };

    let flags = ServerFlags.None;
    if (serverIsVerified) {
        flags |= ServerFlags.Verified;
    }

    const server = {
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        owner_id: userIsOwner ? user.id : faker.datatype.uuid(),
        flags,
        created_at: faker.date.past().toString(),
        updated_at: faker.date.past().toString(),
    };

    const firstChannel = {
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        server_id: server.id,
        created_at: faker.date.past().toString(),
        updated_at: faker.date.past().toString(),
    };

    const secondChannel = {
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        server_id: server.id,
        created_at: faker.date.past().toString(),
        updated_at: faker.date.past().toString(),
    };

    return {
        dummyData: {
            user,
            server,
            firstChannel,
            secondChannel,
        },
        preloadedState: {
            servers: {
                servers: [
                    server
                ],
                selectedServer: 0
            },
            channels: {
                channels: {
                    [server.id]: {
                        channels: [
                            firstChannel,
                            secondChannel
                        ],
                        selectedChannel: 0
                    }
                }
            },
            users: {
                users: {
                    [server.id]: [
                        user,
                    ]
                }
            },
            user: {
                user,
                isConnected,
                isWebsocketClosed,
            },
            typingUsers: {
                users: {
                    [firstChannel.id]: userIsTyping ? [user] : []
                }
            }
        }
    }
}

function render(
    ui: React.ReactElement,
    {
        preloadedState,
        store = configureStore({ reducer: rootReducer, middleware: rootMiddleware, preloadedState }),
        ...renderOptions
    }: { preloadedState?: Partial<RootState>, store?: EnhancedStore } = {}
) {
    function Wrapper({ children }: { children?: React.ReactNode }) {
        return <Provider store={store}>{children}</Provider>
    }

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render }
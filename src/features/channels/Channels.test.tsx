import React from 'react';
import { rootMiddleware, rootReducer, RootState } from '../../app/store';
import faker from 'faker';
import { render, screen, fireEvent } from '../../utility/testUtils';
import Channels from './Channels';
import { configureStore } from '@reduxjs/toolkit';
import { selectChannel } from './channelsSlice';

jest.mock('jdenticon', () => ({
    update: () => null,
}));

window.HTMLElement.prototype.scrollIntoView = () => ({});

const getStore = (firstChannelName: string, secondChannelName: string, serverId = faker.datatype.uuid()): Partial<RootState> => {
    const userId = faker.datatype.uuid();

    return {
        servers: {
            servers: [
                {
                    id: serverId,
                    name: faker.name.firstName(),
                    owner_id: userId,
                    created_at: faker.date.past().toString(),
                    updated_at: faker.date.past().toString(),
                }
            ],
            selectedServer: 0
        },
        channels: {
            channels: {
                [serverId]: {
                    channels: [
                        {
                            id: faker.datatype.uuid(),
                            name: firstChannelName,
                            server_id: serverId,
                            created_at: faker.date.past().toString(),
                            updated_at: faker.date.past().toString(),
                        },
                        {
                            id: faker.datatype.uuid(),
                            name: secondChannelName,
                            server_id: serverId,
                            created_at: faker.date.past().toString(),
                            updated_at: faker.date.past().toString(),
                        }
                    ],
                    selectedChannel: 0
                }
            }
        },
        user: {
            user: {
                id: userId,
                username: faker.name.firstName(),
                created_at: faker.date.past().toString(),
                updated_at: faker.date.past().toString(),
            },
            isConnected: true,
            isWebsocketClosed: false,
        }
    }
};

describe('Channels', () => {
    it('shows name for all channels', () => {
        const firstChannelName = faker.name.firstName();
        const secondChannelName = faker.name.firstName();

        render(<Channels />, { preloadedState: getStore(firstChannelName, secondChannelName) });

        const firstTextElement = screen.getByTestId('channel-entry-0');
        expect(firstTextElement).toHaveTextContent(`# ${firstChannelName}`);

        const secondTextElement = screen.getByTestId('channel-entry-1');
        expect(secondTextElement).toHaveTextContent(`# ${secondChannelName}`);
    });

    it('shows different style for selected channels', () => {
        const firstChannelName = faker.name.firstName();
        const secondChannelName = faker.name.firstName();

        render(<Channels />, { preloadedState: getStore(firstChannelName, secondChannelName) });

        const selectedTextElement = screen.getByTestId('channel-entry-0');
        expect(selectedTextElement.parentElement as Element).toHaveClass('border-indigo-500');
    });

    it('dispatches selectChannel event on channel click', () => {
        const firstChannelName = faker.name.firstName();
        const secondChannelName = faker.name.firstName();
        const serverId = faker.datatype.uuid();

        const store = configureStore({
            reducer: rootReducer,
            middleware: rootMiddleware,
            preloadedState: getStore(firstChannelName, secondChannelName, serverId),
        });
        store.dispatch = jest.fn();

        render(<Channels />, { store });

        const secondElement = screen.getByTestId('channel-entry-1').parentElement as Element;
        fireEvent.click(secondElement);

        expect(store.dispatch).toHaveBeenCalledWith(selectChannel({ index: 1, serverId }));
    });
});

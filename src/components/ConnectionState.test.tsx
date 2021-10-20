import React from 'react';

import { render, screen } from '../utility/testUtils';
import faker from 'faker';
import { RootState } from '../app/store';
import ConnectionState from './ConnectionState';

const getStore = (isWebsocketClosed: boolean): Partial<RootState> => ({
    user: {
        user: {
            id: faker.datatype.uuid(),
            username: faker.name.firstName(),
            created_at: faker.date.past().toString(),
            updated_at: faker.date.past().toString(),
        },
        isConnected: true,
        isWebsocketClosed,
    }
});

describe('ConnectionState', () => {
    it('shows when isWebsocketClosed is true', () => {
        const preloadedState = getStore(true);

        render(<ConnectionState />, { preloadedState });

        const textElement = screen.getByText(/Oh no 😨/i);
        expect(textElement).toBeInTheDocument();
    });

    it('does not show when isWebsocketClosed is false', () => {
        const preloadedState = getStore(false);

        render(<ConnectionState />, { preloadedState });

        const textElement = screen.queryByText(/Oh no 😨/i);
        expect(textElement).not.toBeInTheDocument();
    });
});

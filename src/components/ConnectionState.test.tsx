import React from 'react';

import { getDummyStore, render, screen } from '../utility/testUtils';
import ConnectionState from './ConnectionState';

describe('ConnectionState', () => {
    it('shows when isWebsocketClosed is true', () => {
        const { preloadedState } = getDummyStore({ isWebsocketClosed: true });

        render(<ConnectionState />, { preloadedState });

        const textElement = screen.getByText(/Oh no 😨/i);
        expect(textElement).toBeInTheDocument();
    });

    it('does not show when isWebsocketClosed is false', () => {
        const { preloadedState } = getDummyStore({ isWebsocketClosed: false });

        render(<ConnectionState />, { preloadedState });

        const textElement = screen.queryByText(/Oh no 😨/i);
        expect(textElement).not.toBeInTheDocument();
    });
});

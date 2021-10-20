import React from 'react';

import { render, screen, fireEvent } from '../utility/testUtils';
import faker from 'faker';
import { RootState } from '../app/store';
import Index from '../pages/Index';
import Loading from './Loading';
import { act } from 'react-dom/test-utils';

jest.mock('jdenticon', () => ({
    update: () => null,
}));

window.HTMLElement.prototype.scrollIntoView = () => ({});

const getStore = (isConnected: boolean): Partial<RootState> => ({
    user: {
        user: {
            id: faker.datatype.uuid(),
            username: faker.name.firstName(),
            created_at: faker.date.past().toString(),
            updated_at: faker.date.past().toString(),
        },
        isConnected: isConnected,
        isWebsocketClosed: false,
    }
});

describe('Loading', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    it('shows when isConnected is false', () => {
        const preloadedState = getStore(false);

        render(<Index />, { preloadedState });

        const textElement = screen.getByText(/Connecting/i);
        expect(textElement).toBeInTheDocument();
    });

    it('does not show when isConnected is true', () => {
        const preloadedState = getStore(true);

        render(<Index />, { preloadedState });

        const textElement = screen.queryByText(/Connecting/i);
        expect(textElement).not.toBeInTheDocument();
    });

    it('clears localstorage when button is pressed', () => {
        render(<Loading />);

        localStorage.setItem('foo', 'bar');
        expect(localStorage.length).toBe(1);

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(localStorage.length).toBe(0);
    });

    it('shows extra text after 5 seconds', () => {
        jest.useFakeTimers();

        render(<Loading />);

        const textElement1 = screen.queryByText(/This takes longer than usual 😟/i);
        expect(textElement1).not.toBeInTheDocument();

        // We need act() as it updates the component
        act(() => {
            jest.runAllTimers();
        });

        const textElement2 = screen.getByText(/This takes longer than usual 😟/i);
        expect(textElement2).toBeInTheDocument();
    });
});
import React from 'react';

import { render, screen, fireEvent, getDummyStore } from '../utility/testUtils';
import Index from '../pages/Index';
import Loading from './Loading';
import { act } from 'react-dom/test-utils';

describe('Loading', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    it('shows when isConnected is false', () => {
        const { preloadedState } = getDummyStore({ isConnected: false });

        render(<Index />, { preloadedState });

        const textElement = screen.getByText(/Connecting/i);
        expect(textElement).toBeInTheDocument();
    });

    it('does not show when isConnected is true', () => {
        const { preloadedState } = getDummyStore({ isConnected: true });

        render(<Index />, { preloadedState });

        const textElement = screen.queryByText(/Connecting/i);
        expect(textElement).not.toBeInTheDocument();
    });

    it('clears localstorage and reloads page when button is pressed', () => {
        const locationReloadMock = jest.fn();

        // Prevent unimplemented location issue from jest
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            value: {
                ...window.location,
                reload: locationReloadMock,
            },
            writable: true
        });

        render(<Loading />);

        localStorage.setItem('foo', 'bar');
        expect(localStorage.length).toBe(1);

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(localStorage.length).toBe(0);
        expect(locationReloadMock).toBeCalledTimes(1);
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
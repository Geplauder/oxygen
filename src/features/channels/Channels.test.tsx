import React from 'react';
import { rootMiddleware, rootReducer } from '../../app/store';
import { render, screen, fireEvent, getDummyStore } from '../../utility/testUtils';
import Channels from './Channels';
import { configureStore } from '@reduxjs/toolkit';
import { selectChannel } from './channelsSlice';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

describe('Channels', () => {
    it('shows name for all channels', () => {
        const { preloadedState, dummyData } = getDummyStore();

        render(<Channels />, { preloadedState });

        const firstTextElement = screen.getByTestId('channel-entry-0');
        expect(firstTextElement).toHaveTextContent(`# ${dummyData.firstChannel.name}`);

        const secondTextElement = screen.getByTestId('channel-entry-1');
        expect(secondTextElement).toHaveTextContent(`# ${dummyData.secondChannel.name}`);
    });

    it('shows different style for selected channels', () => {
        const { preloadedState } = getDummyStore();

        render(<Channels />, { preloadedState });

        const selectedTextElement = screen.getByTestId('channel-entry-0');
        expect(selectedTextElement.parentElement as Element).toHaveClass('border-indigo-500');
    });

    it('dispatches selectChannel event on channel click', () => {
        const { preloadedState, dummyData } = getDummyStore();
        const serverId = dummyData.server.id;

        const store = configureStore({
            reducer: rootReducer,
            middleware: rootMiddleware,
            preloadedState,
        });
        store.dispatch = jest.fn();

        render(<Channels />, { store });

        const secondElement = screen.getByTestId('channel-entry-1').parentElement as Element;
        fireEvent.click(secondElement);

        expect(store.dispatch).toHaveBeenCalledWith(selectChannel({ index: 1, serverId }));
    });

    it('shows edit icon when user is server owner', () => {
        const { preloadedState } = getDummyStore({ userIsOwner: true });

        render(<Channels />, { preloadedState });

        const editElement = screen.getAllByTestId('channel-edit');
        expect(editElement.length).toBe(2);
    });

    it('does not show edit icon when user is not server owner', () => {
        const { preloadedState } = getDummyStore({ userIsOwner: false });

        render(<Channels />, { preloadedState });

        const editElement = screen.queryByTestId('channel-edit');
        expect(editElement).not.toBeInTheDocument();
    });

    it('opens channel settings when channel edit button is clicked', () => {
        const history = createMemoryHistory();
        const { preloadedState, dummyData } = getDummyStore({ userIsOwner: true });

        render(
            <Router history={history}>
                <Channels />
            </Router>,
            { preloadedState }
        );

        fireEvent.click(screen.getAllByTestId('channel-edit')[0]);

        expect(history.location.pathname).toBe(`/channel-settings/${dummyData.firstChannel.id}/channel`);
    });
});

import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { rootMiddleware, rootReducer } from '../../app/store';
import { getDummyStore, render, screen, fireEvent } from '../../utility/testUtils';
import ChannelListItem from './ChannelListItem';
import { selectChannel } from './channelsSlice';

describe('ChannelListItem', () => {
    it('shows different style for selected channels', () => {
        const { preloadedState, dummyData } = getDummyStore();

        render(<ChannelListItem channel={dummyData.firstChannel} idx={0} />, { preloadedState });

        const selectedTextElement = screen.getByTestId('channel-entry');
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

        render(<ChannelListItem channel={dummyData.secondChannel} idx={1} />, { store });

        const secondElement = screen.getByTestId('channel-entry').parentElement as Element;
        fireEvent.click(secondElement);

        expect(store.dispatch).toHaveBeenCalledWith(selectChannel({ index: 1, serverId }));
    });

    it('shows edit icon when user is server owner', () => {
        const { preloadedState, dummyData } = getDummyStore({ userIsOwner: true });

        render(<ChannelListItem channel={dummyData.firstChannel} idx={0} />, { preloadedState });

        const editElement = screen.getByTestId('channel-edit');
        expect(editElement).toBeInTheDocument;
    });

    it('does not show edit icon when user is not server owner', () => {
        const { preloadedState, dummyData } = getDummyStore({ userIsOwner: false });

        render(<ChannelListItem channel={dummyData.firstChannel} idx={0} />, { preloadedState });

        const editElement = screen.queryByTestId('channel-edit');
        expect(editElement).not.toBeInTheDocument();
    });

    it('opens channel settings when channel edit button is clicked', () => {
        const history = createMemoryHistory();
        const { preloadedState, dummyData } = getDummyStore({ userIsOwner: true });

        render(
            <Router history={history}>
                <ChannelListItem channel={dummyData.firstChannel} idx={0} />
            </Router>,
            { preloadedState }
        );

        fireEvent.click(screen.getByTestId('channel-edit'));

        expect(history.location.pathname).toBe(`/channel-settings/${dummyData.firstChannel.id}/channel`);
    });
});
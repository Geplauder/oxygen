import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent, intersectionObserverMock, waitFor } from '../../utility/testUtils';
import DeleteChannel from './DeleteChannel';
import faker from 'faker';
import { configureStore } from '@reduxjs/toolkit';
import { rootMiddleware, rootReducer } from '../../app/store';
import { Channel } from '../../types';

window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

const CHANNEL: Channel = {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    server_id: faker.datatype.uuid(),
    created_at: faker.date.past().toString(),
    updated_at: faker.date.past().toString(),
};

describe('DeleteChannel', () => {
    it('is open when open prop is true', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <DeleteChannel channel={CHANNEL} open={true} setOpen={() => null} />
            </Router>
        );

        const textElement = screen.getByText(/Are you sure you want to delete this channel\?/i);
        expect(textElement).toBeInTheDocument();
    });

    it('is not open when open prop is false', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <DeleteChannel channel={CHANNEL} open={false} setOpen={() => null} />
            </Router>
        );

        const textElement = screen.queryByText(/Are you sure you want to delete this channel\?/i);
        expect(textElement).not.toBeInTheDocument();
    });

    it('dispatches deleteChannelAsync event on delete button click', async () => {
        const history = createMemoryHistory();

        const store = configureStore({
            reducer: rootReducer,
            middleware: rootMiddleware,
        });

        const dispatchMock = jest.fn().mockImplementation(() =>
            Promise.resolve(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(
            <Router history={history}>
                <DeleteChannel channel={CHANNEL} open={true} setOpen={() => null} />
            </Router>,
            { store }
        );

        fireEvent.click(screen.getByText('Delete'));

        await waitFor(() => {
            expect(dispatchMock).toBeCalledWith(
                expect.any(Function)
            )
        });
    });
});
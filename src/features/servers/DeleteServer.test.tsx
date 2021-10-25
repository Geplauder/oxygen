import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent, waitFor, getDummyStore } from '../../utility/testUtils';
import DeleteServer from './DeleteServer';
import { configureStore } from '@reduxjs/toolkit';
import { rootMiddleware, rootReducer } from '../../app/store';

describe('DeleteServer', () => {
    it('is open when open prop is true', () => {
        const history = createMemoryHistory();
        const { preloadedState } = getDummyStore();

        render(
            <Router history={history}>
                <DeleteServer open={true} setOpen={() => null} />
            </Router>,
            { preloadedState }
        );

        const textElement = screen.getByText(/Are you sure you want to delete this server\?/i);
        expect(textElement).toBeInTheDocument();
    });

    it('is not open when open prop is false', () => {
        const history = createMemoryHistory();
        const { preloadedState } = getDummyStore();

        render(
            <Router history={history}>
                <DeleteServer open={false} setOpen={() => null} />
            </Router>,
            { preloadedState }
        );

        const textElement = screen.queryByText(/Are you sure you want to delete this server\?/i);
        expect(textElement).not.toBeInTheDocument();
    });

    it('dispatches deleteServerAsync event on delete button click', async () => {
        const history = createMemoryHistory();
        const { preloadedState } = getDummyStore();

        const store = configureStore({
            reducer: rootReducer,
            middleware: rootMiddleware,
            preloadedState,
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
                <DeleteServer open={true} setOpen={() => null} />
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
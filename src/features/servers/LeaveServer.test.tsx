import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent, waitFor, getDummyStore } from '../../utility/testUtils';
import LeaveServer from './LeaveServer';
import { configureStore } from '@reduxjs/toolkit';
import { rootMiddleware, rootReducer } from '../../app/store';

describe('LeaveServer', () => {
    it('is open when open prop is true', () => {
        const history = createMemoryHistory();
        const { preloadedState } = getDummyStore();

        render(
            <Router history={history}>
                <LeaveServer open={true} setOpen={() => null} />
            </Router>,
            { preloadedState }
        );

        const textElement = screen.getByText(/Are you sure you want to leave this server\?/i);
        expect(textElement).toBeInTheDocument();
    });

    it('is not open when open prop is false', () => {
        const history = createMemoryHistory();
        const { preloadedState } = getDummyStore();

        render(
            <Router history={history}>
                <LeaveServer open={false} setOpen={() => null} />
            </Router>,
            { preloadedState }
        );

        const textElement = screen.queryByText(/Are you sure you want to leave this server\?/i);
        expect(textElement).not.toBeInTheDocument();
    });

    it('dispatches leaveServerAsync event on leave button click', async () => {
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
                <LeaveServer open={true} setOpen={() => null} />
            </Router>,
            { store }
        );

        fireEvent.click(screen.getByText('Leave'));

        await waitFor(() => {
            expect(dispatchMock).toBeCalledWith(
                expect.any(Function)
            )
        });
    });
});
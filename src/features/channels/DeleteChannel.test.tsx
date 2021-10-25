import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent, waitFor, getDummyStore } from '../../utility/testUtils';
import DeleteChannel from './DeleteChannel';
import { configureStore } from '@reduxjs/toolkit';
import { rootMiddleware, rootReducer } from '../../app/store';

describe('DeleteChannel', () => {
    it('is open when open prop is true', () => {
        const { dummyData } = getDummyStore();
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <DeleteChannel channel={dummyData.firstChannel} open={true} setOpen={() => null} />
            </Router>
        );

        const textElement = screen.getByText(/Are you sure you want to delete this channel\?/i);
        expect(textElement).toBeInTheDocument();
    });

    it('is not open when open prop is false', () => {
        const { dummyData } = getDummyStore();
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <DeleteChannel channel={dummyData.firstChannel} open={false} setOpen={() => null} />
            </Router>
        );

        const textElement = screen.queryByText(/Are you sure you want to delete this channel\?/i);
        expect(textElement).not.toBeInTheDocument();
    });

    it('dispatches deleteChannelAsync event on delete button click', async () => {
        const { dummyData } = getDummyStore();
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
                <DeleteChannel channel={dummyData.firstChannel} open={true} setOpen={() => null} />
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
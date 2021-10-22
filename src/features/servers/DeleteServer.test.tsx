import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent, intersectionObserverMock, waitFor } from '../../utility/testUtils';
import DeleteServer from './DeleteServer';
import faker from 'faker';
import { configureStore } from '@reduxjs/toolkit';
import { rootMiddleware, rootReducer } from '../../app/store';

window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

const getStore = () => ({
    servers: {
        servers: [
            {
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                owner_id: faker.datatype.uuid(),
                created_at: faker.date.past().toString(),
                updated_at: faker.date.past().toString(),
            }
        ],
        selectedServer: 0
    },
})

describe('DeleteServer', () => {
    it('is open when open prop is true', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <DeleteServer open={true} setOpen={() => null} />
            </Router>,
            {
                preloadedState: getStore()
            }
        );

        const textElement = screen.getByText(/Are you sure you want to delete this server\?/i);
        expect(textElement).toBeInTheDocument();
    });

    it('is not open when open prop is false', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <DeleteServer open={false} setOpen={() => null} />
            </Router>,
            {
                preloadedState: getStore()
            }
        );

        const textElement = screen.queryByText(/Are you sure you want to delete this server\?/i);
        expect(textElement).not.toBeInTheDocument();
    });

    it('dispatches deleteServerAsync event on delete button click', async () => {
        const history = createMemoryHistory();

        const store = configureStore({
            reducer: rootReducer,
            middleware: rootMiddleware,
            preloadedState: getStore(),
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
            {
                store
            }
        );

        fireEvent.click(screen.getByText('Delete'));

        await waitFor(() => {
            expect(dispatchMock).toBeCalledWith(
                expect.any(Function)
            )
        });
    });
});
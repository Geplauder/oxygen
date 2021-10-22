import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent, intersectionObserverMock, waitFor } from '../../utility/testUtils';
import LeaveServer from './LeaveServer';
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
});

describe('LeaveServer', () => {
    it('is open when open prop is true', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <LeaveServer open={true} setOpen={() => null} />
            </Router>,
            {
                preloadedState: getStore()
            }
        );

        const textElement = screen.getByText(/Are you sure you want to leave this server\?/i);
        expect(textElement).toBeInTheDocument();
    });

    it('is not open when open prop is false', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <LeaveServer open={false} setOpen={() => null} />
            </Router>,
            {
                preloadedState: getStore()
            }
        );

        const textElement = screen.queryByText(/Are you sure you want to leave this server\?/i);
        expect(textElement).not.toBeInTheDocument();
    });

    it('dispatches leaveServerAsync event on leave button click', async () => {
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
                <LeaveServer open={true} setOpen={() => null} />
            </Router>,
            {
                store
            }
        );

        fireEvent.click(screen.getByText('Leave'));

        await waitFor(() => {
            expect(dispatchMock).toBeCalledWith(
                expect.any(Function)
            )
        });
    });
});
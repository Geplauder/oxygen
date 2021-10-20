import React from 'react';

import { render, screen, fireEvent } from '../utility/testUtils';
import { createMemoryHistory } from 'history';
import faker from 'faker';
import ServerName from './ServerName';
import { RootState } from '../app/store';
import { Router } from 'react-router';

const intersectionObserverMock = () => ({
    observe: () => null
})
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

const getStore = (asOwner: boolean, serverName = faker.name.firstName()): Partial<RootState> => {
    const userId = faker.datatype.uuid();

    return {
        servers: {
            servers: [
                {
                    id: faker.datatype.uuid(),
                    name: serverName,
                    owner_id: asOwner ? userId : faker.datatype.uuid(),
                    created_at: faker.date.past().toString(),
                    updated_at: faker.date.past().toString(),
                }
            ],
            selectedServer: 0
        },
        user: {
            user: {
                id: userId,
                username: faker.name.firstName(),
                created_at: faker.date.past().toString(),
                updated_at: faker.date.past().toString(),
            },
            isConnected: true,
            isWebsocketClosed: false,
        }
    }
};

describe('ServerName', () => {
    it('renders server name', () => {
        const serverName = faker.name.firstName();
        const preloadedState = getStore(false, serverName);

        render(<ServerName />, { preloadedState });

        const textElement = screen.getByText(new RegExp(serverName, "i"));

        expect(textElement).toBeInTheDocument();
    });

    it('shows create channel dropdown item when user is owner', () => {
        const preloadedState = getStore(true);

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));

        const dropdownItemElement = screen.getByText(/Create Channel/i);
        expect(dropdownItemElement).toBeInTheDocument();
    });

    it('does not show create channel dropdown item when user not the owner', () => {
        const preloadedState = getStore(false);

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));

        const dropdownItemElement = screen.queryByText(/Create Channel/i);
        expect(dropdownItemElement).not.toBeInTheDocument();
    });

    it('shows server settings dropdown item when user is owner', () => {
        const preloadedState = getStore(true);

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));

        const dropdownItemElement = screen.getByText(/Server Settings/i);
        expect(dropdownItemElement).toBeInTheDocument();
    });

    it('does not show server settings dropdown item when user not owner', () => {
        const preloadedState = getStore(false);

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));

        const dropdownItemElement = screen.queryByText(/Server Settings/i);
        expect(dropdownItemElement).not.toBeInTheDocument();
    });

    it('shows leave server dropdown item when user not owner', () => {
        const preloadedState = getStore(true);

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));

        const dropdownItemElement = screen.queryByText(/Leave Server/i);
        expect(dropdownItemElement).not.toBeInTheDocument();
    });

    it('does not show leave server dropdown item when user is owner', () => {
        const preloadedState = getStore(false);

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));

        const dropdownItemElement = screen.getByText(/Leave Server/i);
        expect(dropdownItemElement).toBeInTheDocument();
    });

    it('shows server settings when dropdown item is clicked', () => {
        const history = createMemoryHistory();
        const preloadedState = getStore(true);

        render(
            <Router history={history}>
                <ServerName />
            </Router>,
            { preloadedState }
        );

        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText(/Server Settings/i));

        expect(history.location.pathname).toBe('/server-settings/server');
    });

    it('opens create channel modal on dropdown item click', () => {
        const preloadedState = getStore(true);

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText(/Create Channel/i));

        // Find better way to identify open modal
        const dropdownItemElement = screen.getByText(/Channel Name/i);
        expect(dropdownItemElement).toBeInTheDocument();
    });

    it('opens leave server modal on dropdown item click', () => {
        const preloadedState = getStore(false);

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText(/Leave Server/i));

        // Find better way to identify open modal
        const dropdownItemElement = screen.getByText('Are you sure you want to leave this server?');
        expect(dropdownItemElement).toBeInTheDocument();
    });
});

import React from 'react';

import { render, screen, fireEvent, intersectionObserverMock, getDummyStore } from '../utility/testUtils';
import { createMemoryHistory } from 'history';
import ServerName from './ServerName';
import { Router } from 'react-router';

window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

describe('ServerName', () => {
    it('renders server name', () => {
        const { preloadedState, dummyData } = getDummyStore({ userIsOwner: false });

        render(<ServerName />, { preloadedState });

        const textElement = screen.getByText(new RegExp(dummyData.server.name, "i"));

        expect(textElement).toBeInTheDocument();
    });

    it('shows create channel dropdown item when user is owner', () => {
        const { preloadedState } = getDummyStore({ userIsOwner: true });

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));

        const dropdownItemElement = screen.getByText(/Create Channel/i);
        expect(dropdownItemElement).toBeInTheDocument();
    });

    it('does not show create channel dropdown item when user not the owner', () => {
        const { preloadedState } = getDummyStore({ userIsOwner: false });


        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));

        const dropdownItemElement = screen.queryByText(/Create Channel/i);
        expect(dropdownItemElement).not.toBeInTheDocument();
    });

    it('shows server settings dropdown item when user is owner', () => {
        const { preloadedState } = getDummyStore({ userIsOwner: true });

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));

        const dropdownItemElement = screen.getByText(/Server Settings/i);
        expect(dropdownItemElement).toBeInTheDocument();
    });

    it('does not show server settings dropdown item when user not owner', () => {
        const { preloadedState } = getDummyStore({ userIsOwner: false });

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));

        const dropdownItemElement = screen.queryByText(/Server Settings/i);
        expect(dropdownItemElement).not.toBeInTheDocument();
    });

    it('shows leave server dropdown item when user not owner', () => {
        const { preloadedState } = getDummyStore({ userIsOwner: false });

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));

        const dropdownItemElement = screen.getByText(/Leave Server/i);
        expect(dropdownItemElement).toBeInTheDocument();
    });

    it('does not show leave server dropdown item when user is owner', () => {
        const { preloadedState } = getDummyStore({ userIsOwner: true });

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));

        const dropdownItemElement = screen.queryByText(/Leave Server/i);
        expect(dropdownItemElement).not.toBeInTheDocument();
    });

    it('shows server settings when dropdown item is clicked', () => {
        const history = createMemoryHistory();
        const { preloadedState } = getDummyStore({ userIsOwner: true });

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
        const { preloadedState } = getDummyStore({ userIsOwner: true });

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText(/Create Channel/i));

        // Find better way to identify open modal
        const dropdownItemElement = screen.getByText(/Channel Name/i);
        expect(dropdownItemElement).toBeInTheDocument();
    });

    it('opens leave server modal on dropdown item click', () => {
        const { preloadedState } = getDummyStore({ userIsOwner: false });

        render(<ServerName />, { preloadedState });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText(/Leave Server/i));

        // Find better way to identify open modal
        const dropdownItemElement = screen.getByText('Are you sure you want to leave this server?');
        expect(dropdownItemElement).toBeInTheDocument();
    });
});

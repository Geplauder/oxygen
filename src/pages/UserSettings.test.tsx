import { render, screen, fireEvent } from '../utility/testUtils';
import { createMemoryHistory } from 'history';
import { store } from '../app/store';
import React from 'react';
import { Router } from 'react-router';
import UserSettings from './UserSettings';
import { invalidateToken } from '../features/auth/authSlice';

describe('UserSettings', () => {
    it('redirects to index on back', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <UserSettings />
            </Router>
        );

        fireEvent.click(screen.getByTestId('settings-go-back'));

        expect(history.location.pathname).toBe('/');
    });

    it('redirects to login on logout', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <UserSettings />
            </Router>
        );

        fireEvent.click(screen.getByText(/Logout/i));

        expect(history.location.pathname).toBe('/login');
    });

    it('dispatches invalidateToken event on logout', () => {
        store.dispatch = jest.fn();
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <UserSettings />
            </Router>,
            { store }
        );

        fireEvent.click(screen.getByText(/Logout/i));

        expect(store.dispatch).toHaveBeenCalledWith(invalidateToken());
    });
});
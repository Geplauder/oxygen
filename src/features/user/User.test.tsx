import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { getDummyStore, render, screen, fireEvent } from '../../utility/testUtils';
import User from './User';

describe('User', () => {
    it('shows the currently logged in users\' username', () => {
        const { preloadedState, dummyData } = getDummyStore();

        render(<User />, { preloadedState });

        const textElement = screen.getByText(dummyData.user.username);
        expect(textElement).toBeInTheDocument();
    });

    it('redirects to user settings when button is pressed', () => {
        const history = createMemoryHistory();
        const { preloadedState } = getDummyStore();

        render(
            <Router history={history}>
                <User />
            </Router>,
            { preloadedState }
        );

        fireEvent.click(screen.getByRole('button'));

        expect(history.location.pathname).toBe('/settings/user');
    });
});
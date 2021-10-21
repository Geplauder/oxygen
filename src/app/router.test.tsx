import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';

import { render, screen } from '../utility/testUtils';
import { AuthenticatedRoute } from './router';

describe('AuthenticatedRoute', () => {
    it.skip('does not show content when unauthenticated', async () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <AuthenticatedRoute path='/'>
                    foobar
                </AuthenticatedRoute>
            </Router>,
            {
                preloadedState: {
                    auth: {
                        token: null,
                    }
                }
            }
        );

        expect(history.location.pathname).toBe('/login');
        expect(screen.queryByText(/foobar/i)).not.toBeInTheDocument();
    });

    it('shows content when authenticated', async () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <AuthenticatedRoute path='/'>
                    foobar
                </AuthenticatedRoute>
            </Router>,
            {
                preloadedState: {
                    auth: {
                        token: 'foobar',
                    }
                }
            }
        );

        expect(history.location.pathname).toBe('/');
        expect(screen.getByText(/foobar/i)).toBeInTheDocument();
    });
});
import { render, screen, fireEvent } from '../utility/testUtils';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import ServerSettings from './ServerSettings';

describe('ServerSettings', () => {
    it('redirects to index on back', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <ServerSettings />
            </Router>
        );

        fireEvent.click(screen.getByTestId('settings-go-back'));

        expect(history.location.pathname).toBe('/');
    });
});
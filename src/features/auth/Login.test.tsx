import React from 'react';

import { render, screen, fireEvent } from '../../utility/testUtils';
import { store } from '../../app/store';
import Login from './Login';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

describe('Login', () => {
    it('dispatches loginAsync event when sign in button is pressed', () => {
        const history = createMemoryHistory();
        const dispatchMock = jest.fn().mockImplementation(() =>
            new Promise(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(
            <Router history={history}>
                <Login />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.click(screen.getByRole('button'));

        expect(dispatchMock).toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('dispatches loginAsync event when enter is pressed in email address input', () => {
        const history = createMemoryHistory();
        const dispatchMock = jest.fn().mockImplementation(() =>
            new Promise(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(
            <Router history={history}>
                <Login />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('email-address'), { key: 'Enter' });

        expect(dispatchMock).toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('dispatches loginAsync event when enter is pressed in password input', () => {
        const history = createMemoryHistory();
        const dispatchMock = jest.fn().mockImplementation(() =>
            new Promise(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(
            <Router history={history}>
                <Login />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('password'), { key: 'Enter' });

        expect(dispatchMock).toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('does not dispatch loginAsync event when enter is not pressed in email address input', () => {
        const history = createMemoryHistory();
        const dispatchMock = jest.fn().mockImplementation(() =>
            new Promise(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(
            <Router history={history}>
                <Login />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('email-address'), { key: 'foo' });

        expect(dispatchMock).not.toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('does not dispatch loginAsync event when enter is not pressed in password input', () => {
        const history = createMemoryHistory();
        const dispatchMock = jest.fn().mockImplementation(() =>
            new Promise(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(
            <Router history={history}>
                <Login />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('password'), { key: 'foo' });

        expect(dispatchMock).not.toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('shows error when email address is empty', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.click(screen.getByRole('button'));

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });

    it('shows error when password is empty', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.click(screen.getByRole('button'));

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });

    it('redirects to sign up page when link is pressed', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <Login />
            </Router>
        );

        fireEvent.click(screen.getByRole('link'));

        expect(history.location.pathname).toBe('/register');
    });

    it('redirects to index page when user token is set in store', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <Login />
            </Router>,
            {
                preloadedState: {
                    auth: {
                        token: 'foo',
                    }
                }
            }
        );

        expect(history.location.pathname).toBe('/');
    });
});
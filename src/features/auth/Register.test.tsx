import { createMemoryHistory } from 'history';
import React from 'react';

import { render, screen, fireEvent } from '../../utility/testUtils';
import { store } from '../../app/store';
import Register from './Register';
import { Router } from 'react-router';

describe('Register', () => {
    it('dispatches registerAsync event when sign up button is pressed', () => {
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
                <Register />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'foobar' } });
        fireEvent.click(screen.getByRole('button'));

        expect(dispatchMock).toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('dispatches registerAsync event when enter is pressed in username input', () => {
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
                <Register />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('username'), { key: 'Enter' });

        expect(dispatchMock).toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('dispatches registerAsync event when enter is pressed in email address input', () => {
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
                <Register />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('email-address'), { key: 'Enter' });

        expect(dispatchMock).toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('dispatches registerAsync event when enter is pressed in password input', () => {
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
                <Register />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('password'), { key: 'Enter' });

        expect(dispatchMock).toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('dispatches registerAsync event when enter is pressed in confirm password input', () => {
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
                <Register />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('confirm-password'), { key: 'Enter' });

        expect(dispatchMock).toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('does not dispatch registerAsync event when enter is not pressed in username input', () => {
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
                <Register />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('username'), { key: 'foo' });

        expect(dispatchMock).not.toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('does not dispatch registerAsync event when enter is not pressed in email address input', () => {
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
                <Register />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('email-address'), { key: 'foo' });

        expect(dispatchMock).not.toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('does not dispatch registerAsync event when enter is not pressed in password input', () => {
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
                <Register />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('password'), { key: 'foo' });

        expect(dispatchMock).not.toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('does not dispatch registerAsync event when enter is not pressed in confirm password input', () => {
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
                <Register />
            </Router>,
            { store }
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('confirm-password'), { key: 'foo' });

        expect(dispatchMock).not.toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('shows error when username is empty', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'foobar' } });
        fireEvent.click(screen.getByRole('button'));

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });

    it('shows error when email address is empty', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'foobar' } });
        fireEvent.click(screen.getByRole('button'));

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });

    it('shows error when password is empty', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'foobar' } });
        fireEvent.click(screen.getByRole('button'));

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });

    it('shows error when confirm password is empty', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.click(screen.getByRole('button'));

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });

    it('redirects to sign in page when link is pressed', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <Register />
            </Router>
        );

        fireEvent.click(screen.getByRole('link'));

        expect(history.location.pathname).toBe('/login');
    });

    it('redirects to index page when user token is set in store', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <Register />
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

    it('shows error when password and confirm password do not match', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('email-address'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'barfoo' } });
        fireEvent.click(screen.getByRole('button'));

        const textElement = screen.getByText(/Passwords do not match./i);
        expect(textElement).toBeInTheDocument();
    });
});

import React from 'react';

import { render, screen, fireEvent, intersectionObserverMock } from '../../utility/testUtils';
import UpdateServerField from './UpdateServerField';
import { store } from '../../app/store';

window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

describe('UpdateServerField', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('shows modal on update button click', () => {
        render(<UpdateServerField serverId='' field='' displayField='foobar' inputType='text' />);

        fireEvent.click(screen.getByRole('button'));

        const textElement = screen.getByText(/Update foobar/i);
        expect(textElement).toBeInTheDocument();
    });

    it('dispatches postUpdateServerAsync event on update button pressed', () => {
        const dispatchMock = jest.fn().mockImplementation(() =>
            new Promise(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(<UpdateServerField serverId='abc123' field='foo' displayField='foobar' inputType='text' />, { store });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foobar' } });
        fireEvent.click(screen.getAllByText(/Update/i).at(-1) as Element);

        // TODO: Expect specific postUpdateServerAsync function call
        expect(dispatchMock).toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('dispatches postUpdateServerAsync event on enter key pressed in input', () => {
        const dispatchMock = jest.fn().mockImplementation(() =>
            new Promise(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(<UpdateServerField serverId='abc123' field='foo' displayField='foobar' inputType='text' />, { store });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

        // TODO: Expect specific postUpdateServerAsync function call
        expect(dispatchMock).toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('does not dispatch postUpdateServerAsync event when key pressed is not enter in input', () => {
        const dispatchMock = jest.fn().mockImplementation(() =>
            new Promise(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(<UpdateServerField serverId='abc123' field='foo' displayField='foobar' inputType='text' />, { store });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'foo' });

        // TODO: Expect specific postUpdateServerAsync function call
        expect(dispatchMock).not.toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('shows error when value is empty', () => {
        render(<UpdateServerField serverId='abc123' field='foo' displayField='foobar' inputType='text' />);

        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getAllByText(/Update/i).at(-1) as Element);

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });
});
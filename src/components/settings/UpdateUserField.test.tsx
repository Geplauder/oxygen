import React from 'react';

import { render, screen, fireEvent, waitFor } from '../../utility/testUtils';
import UpdateUserField from './UpdateUserField';
import { store } from '../../app/store';

describe('UpdateUserField', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('shows modal on update button click', () => {
        render(<UpdateUserField field='' displayField='foobar' inputType='text' />);

        fireEvent.click(screen.getByRole('button'));

        const textElement = screen.getByText(/Update foobar/i);
        expect(textElement).toBeInTheDocument();
    });

    it('shows confirm value input when requireConfirmation prop is true', () => {
        render(<UpdateUserField requireConfirmation={true} field='' displayField='foobar' inputType='text' />);

        fireEvent.click(screen.getByRole('button'));

        const inputElement = screen.getByTestId('confirm-value');
        expect(inputElement).toBeInTheDocument();
    });

    it('dispatches postUpdateUserEvent event on update button pressed', async () => {
        const dispatchMock = jest.fn().mockImplementation(() =>
            Promise.resolve(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(<UpdateUserField field='foo' displayField='foobar' inputType='text' />, { store });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByTestId('field-value'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('current-password'), { target: { value: 'foobar' } });
        fireEvent.click(screen.getAllByText(/Update/i).at(-1) as Element);

        // TODO: Expect specific postUpdateUserEvent function call
        await waitFor(() => {
            expect(dispatchMock).toHaveBeenCalledWith(
                expect.any(Function)
            );
        });
    });

    it('dispatches postUpdateUserEvent event on enter key pressed in input', async () => {
        const dispatchMock = jest.fn().mockImplementation(() =>
            Promise.resolve(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(<UpdateUserField field='foo' displayField='foobar' inputType='text' />, { store });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByTestId('field-value') as Element, { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('current-password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

        // TODO: Expect specific postUpdateUserEvent function call
        await waitFor(() => {
            expect(dispatchMock).toHaveBeenCalledWith(
                expect.any(Function)
            );
        });
    });

    it('does not dispatch postUpdateUserEvent event when key pressed is not enter in input', async () => {
        const dispatchMock = jest.fn().mockImplementation(() =>
            Promise.resolve(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(<UpdateUserField field='foo' displayField='foobar' inputType='text' />, { store });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByTestId('field-value') as Element, { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('current-password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'foo' });

        // TODO: Expect specific postUpdateUserEvent function call
        await waitFor(() => {
            expect(dispatchMock).not.toHaveBeenCalledWith(
                expect.any(Function)
            );
        });
    });

    it('shows error when value is empty', () => {
        render(<UpdateUserField field='foo' displayField='foobar' inputType='text' />);

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByTestId('current-password'), { target: { value: 'foobar' } });
        fireEvent.click(screen.getAllByText(/Update/i).at(-1) as Element);

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });

    it('shows error when current password is empty', () => {
        render(<UpdateUserField field='foo' displayField='foobar' inputType='text' />);

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByTestId('field-value') as Element, { target: { value: 'foobar' } });
        fireEvent.click(screen.getAllByText(/Update/i).at(-1) as Element);

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });

    it('shows error when confirm value is empty when requireConfirmation prop is true', () => {
        render(<UpdateUserField requireConfirmation={true} field='foo' displayField='foobar' inputType='text' />);

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByTestId('field-value') as Element, { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('current-password'), { target: { value: 'foobar' } });
        fireEvent.click(screen.getAllByText(/Update/i).at(-1) as Element);

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });
});
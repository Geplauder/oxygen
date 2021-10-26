import React from 'react';

import { render, screen, fireEvent, waitFor } from '../../utility/testUtils';
import { UpdateField } from './UpdateField';
import { store } from '../../app/store';

const callbackMock = jest.fn().mockImplementation(() => Promise.resolve(() => ({
    status: {
        type: 'ok',
    }
})));

describe('UpdateField', () => {
    afterEach(() => {
        jest.restoreAllMocks();
        callbackMock.mockClear();
    });

    it('shows modal on update button click', () => {
        render(<UpdateField callback={callbackMock} field='' displayField='foobar' inputType='text' />);

        fireEvent.click(screen.getByRole('button'));

        const textElement = screen.getByText(/Update foobar/i);
        expect(textElement).toBeInTheDocument();
    });

    it('shows confirm value input when requireValueConfirmation prop is true', () => {
        render(<UpdateField callback={callbackMock} requireValueConfirmation={true} field='' displayField='foobar' inputType='text' />);

        fireEvent.click(screen.getByRole('button'));

        const inputElement = screen.getByTestId('confirm-value');
        expect(inputElement).toBeInTheDocument();
    });

    it('shows current password input when requirePasswordConfirmation prop is true', () => {
        render(<UpdateField callback={callbackMock} requirePasswordConfirmation={true} field='' displayField='foobar' inputType='text' />);

        fireEvent.click(screen.getByRole('button'));

        const inputElement = screen.getByTestId('current-password');
        expect(inputElement).toBeInTheDocument();
    });

    it('calls callback on update button pressed', async () => {
        render(<UpdateField callback={callbackMock} field='foo' displayField='foobar' inputType='text' />, { store });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByTestId('field-value'), { target: { value: 'foobar' } });
        fireEvent.click(screen.getAllByText(/Update/i).at(-1) as Element);

        await waitFor(() => {
            expect(callbackMock).toHaveBeenCalledTimes(1);
        });
    });

    it('calls callback on enter key pressed in value input', async () => {
        render(<UpdateField callback={callbackMock} field='foo' displayField='foobar' inputType='text' />, { store });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByTestId('field-value'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('field-value'), { key: 'Enter' });

        await waitFor(() => {
            expect(callbackMock).toHaveBeenCalledTimes(1);
        });
    });

    it('calls callback on enter key pressed in confirm value input', async () => {
        render(<UpdateField callback={callbackMock} field='foo' displayField='foobar' inputType='text' requireValueConfirmation={true} />, { store });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByTestId('field-value'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('confirm-value'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('confirm-value'), { key: 'Enter' });

        await waitFor(() => {
            expect(callbackMock).toHaveBeenCalledTimes(1);
        });
    });

    it('calls callback on enter key pressed in current password input', async () => {
        render(<UpdateField callback={callbackMock} field='foo' displayField='foobar' inputType='text' requirePasswordConfirmation={true} />, { store });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByTestId('field-value'), { target: { value: 'foobar' } });
        fireEvent.change(screen.getByTestId('current-password'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('current-password'), { key: 'Enter' });

        await waitFor(() => {
            expect(callbackMock).toHaveBeenCalledTimes(1);
        });
    });

    it('does not call callback when key pressed is not enter in input', async () => {
        render(<UpdateField callback={callbackMock} field='foo' displayField='foobar' inputType='text' />, { store });

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByTestId('field-value'), { target: { value: 'foobar' } });
        fireEvent.keyDown(screen.getByTestId('field-value'), { key: 'foo' });

        await waitFor(() => {
            expect(callbackMock).not.toHaveBeenCalled()
        });
    });

    it('shows error when value is empty', () => {
        render(<UpdateField callback={callbackMock} field='foo' displayField='foobar' inputType='text' />);

        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getAllByText(/Update/i).at(-1) as Element);

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });

    it('shows error when current password is empty', () => {
        render(<UpdateField callback={callbackMock} field='foo' displayField='foobar' inputType='text' requirePasswordConfirmation={true} />);

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByTestId('field-value') as Element, { target: { value: 'foobar' } });
        fireEvent.click(screen.getAllByText(/Update/i).at(-1) as Element);

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });

    it('shows error when confirm value is empty when requireConfirmation prop is true', () => {
        render(<UpdateField callback={callbackMock} requireValueConfirmation={true} field='foo' displayField='foobar' inputType='text' />);

        fireEvent.click(screen.getByRole('button'));
        fireEvent.change(screen.getByTestId('field-value') as Element, { target: { value: 'foobar' } });
        fireEvent.click(screen.getAllByText(/Update/i).at(-1) as Element);

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });
});
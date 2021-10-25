import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utility/testUtils';
import CreateServer from './CreateServer';
import { store } from '../../app/store';

describe('CreateServer', () => {
    it('is open when open prop is true', () => {
        render(<CreateServer open={true} setOpen={() => null} />);

        const textElement = screen.getByText(/Create Server/i);
        expect(textElement).toBeInTheDocument();
    });

    it('is not open when open prop is false', () => {
        render(<CreateServer open={false} setOpen={() => null} />);

        const textElement = screen.queryByText(/Create Server/i);
        expect(textElement).not.toBeInTheDocument();
    });

    it('shows error when server name input is empty', () => {
        render(<CreateServer open={true} setOpen={() => null} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
        fireEvent.click(screen.getByText('Create'));

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });

    it('dispatches postServerAsync event when create button is clicked', async () => {
        const dispatchMock = jest.fn().mockImplementation(() =>
            Promise.resolve(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(<CreateServer open={true} setOpen={() => null} />, { store });

        fireEvent.click(screen.getByText('Create'));

        await waitFor(() => {
            expect(dispatchMock).toBeCalledWith(
                expect.any(Function)
            );
        });
    });

    it('dispatches postServerAsync event when enter key is pressed in input', async () => {
        const dispatchMock = jest.fn().mockImplementation(() =>
            Promise.resolve(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(<CreateServer open={true} setOpen={() => null} />, { store });

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

        await waitFor(() => {
            expect(dispatchMock).toBeCalledWith(
                expect.any(Function)
            );
        });
    });

    it('does not dispatch postServerAsync event when enter key is not pressed in input', async () => {
        const dispatchMock = jest.fn().mockImplementation(() =>
            Promise.resolve(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(<CreateServer open={true} setOpen={() => null} />, { store });

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'foo' });

        await waitFor(() => {
            expect(dispatchMock).not.toBeCalledWith(
                expect.any(Function)
            );
        });
    });
});
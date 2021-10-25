import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utility/testUtils';
import { store } from '../../app/store';
import JoinServer from './JoinServer';

describe('JoinServer', () => {
    it('is open when open prop is true', () => {
        render(<JoinServer open={true} setOpen={() => null} />);

        const textElement = screen.getByText(/Join Server/i);
        expect(textElement).toBeInTheDocument();
    });

    it('is not open when open prop is false', () => {
        render(<JoinServer open={false} setOpen={() => null} />);

        const textElement = screen.queryByText(/Join Server/i);
        expect(textElement).not.toBeInTheDocument();
    });

    it('shows error when server id input is empty', () => {
        render(<JoinServer open={true} setOpen={() => null} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
        fireEvent.click(screen.getByText('Join'));

        const textElement = screen.getByText(/Please fill out all fields./i);
        expect(textElement).toBeInTheDocument();
    });

    it('dispatches joinServerAsync event when join button is clicked', async () => {
        const dispatchMock = jest.fn().mockImplementation(() =>
            Promise.resolve(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(<JoinServer open={true} setOpen={() => null} />, { store });

        fireEvent.click(screen.getByText('Join'));

        await waitFor(() => {
            expect(dispatchMock).toBeCalledWith(
                expect.any(Function)
            );
        });
    });

    it('dispatches joinServerAsync event when enter key is pressed in input', async () => {
        const dispatchMock = jest.fn().mockImplementation(() =>
            Promise.resolve(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(<JoinServer open={true} setOpen={() => null} />, { store });

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

        await waitFor(() => {
            expect(dispatchMock).toBeCalledWith(
                expect.any(Function)
            );
        });
    });

    it('does not dispatch joinServerAsync event when enter key is not pressed in input', async () => {
        const dispatchMock = jest.fn().mockImplementation(() =>
            Promise.resolve(() => ({
                status: {
                    type: 'ok',
                }
            }))
        );
        store.dispatch = dispatchMock;

        render(<JoinServer open={true} setOpen={() => null} />, { store });

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'foo' });

        await waitFor(() => {
            expect(dispatchMock).not.toBeCalledWith(
                expect.any(Function)
            );
        });
    });
});
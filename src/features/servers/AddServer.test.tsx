import React from 'react';
import { render, screen, fireEvent, intersectionObserverMock, waitFor } from '../../utility/testUtils';
import AddServer from './AddServer';

window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

describe('AddServer', () => {
    it('opens modal on button click', () => {
        render(<AddServer />);

        fireEvent.click(screen.getByRole('button'));

        const textElement = screen.getByText(/Add Server/i);
        expect(textElement).toBeInTheDocument();
    });

    it('closes modal on cancel button click', async () => {
        render(<AddServer />);

        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText(/Cancel/i));

        await waitFor(() => {
            const textElement = screen.queryByText(/Add Server/i);
            expect(textElement).not.toBeInTheDocument();
        });
    });

    it('opens create server modal when create button is clicked', () => {
        render(<AddServer />);

        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText(/Create/i));

        const textElement = screen.getByText(/Create Server/i);
        expect(textElement).toBeInTheDocument();
    });

    it('opens join server modal when join button is clicked', () => {
        render(<AddServer />);

        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText(/Join/i));

        const textElement = screen.getByText(/Join Server/i);
        expect(textElement).toBeInTheDocument();
    });

    it('focuses cancel button on modal open', () => {
        render(<AddServer />);

        fireEvent.click(screen.getByRole('button'));

        const buttonElement = screen.getByText(/Cancel/i);
        expect(buttonElement).toHaveFocus();
    });
});
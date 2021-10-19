import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { PrimaryButton, SecondaryButton, DangerButton } from './Buttons';

describe('PrimaryButton', () => {
    it('renders provided text', () => {
        render(<PrimaryButton>foobar</PrimaryButton>);

        const buttonElement = screen.getByText(/foobar/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('calls callback on click', () => {
        const mockCallback = jest.fn();

        render(<PrimaryButton onClick={mockCallback}>foobar</PrimaryButton>);

        fireEvent.click(screen.getByRole('button'));

        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('is disabled when isLoading is true', () => {
        render(<PrimaryButton isLoading={true}>foobar</PrimaryButton>);

        const buttonElement = screen.getByText(/foobar/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('is shows loading spinner when isLoading is true', () => {
        const { container } = render(<PrimaryButton isLoading={true}>foobar</PrimaryButton>);

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });
});

describe('SecondaryButton', () => {
    it('renders provided text', () => {
        render(<SecondaryButton>foobar</SecondaryButton>);

        const buttonElement = screen.getByText(/foobar/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('calls callback on click', () => {
        const mockCallback = jest.fn();

        render(<SecondaryButton onClick={mockCallback}>foobar</SecondaryButton>);

        fireEvent.click(screen.getByRole('button'));

        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('is disabled when isLoading is true', () => {
        render(<SecondaryButton isLoading={true}>foobar</SecondaryButton>);

        const buttonElement = screen.getByText(/foobar/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('is shows loading spinner when isLoading is true', () => {
        const { container } = render(<SecondaryButton isLoading={true}>foobar</SecondaryButton>);

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });
});

describe('DangerButton', () => {
    it('renders provided text', () => {
        render(<DangerButton>foobar</DangerButton>);

        const buttonElement = screen.getByText(/foobar/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('calls callback on click', () => {
        const mockCallback = jest.fn();

        render(<DangerButton onClick={mockCallback}>foobar</DangerButton>);

        fireEvent.click(screen.getByRole('button'));

        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('is disabled when isLoading is true', () => {
        render(<DangerButton isLoading={true}>foobar</DangerButton>);

        const buttonElement = screen.getByText(/foobar/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('is shows loading spinner when isLoading is true', () => {
        const { container } = render(<DangerButton isLoading={true}>foobar</DangerButton>);

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });
});
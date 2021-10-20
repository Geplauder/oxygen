import React from 'react';

import { render, screen, fireEvent } from '../utility/testUtils';
import { ActionModal, Modal } from './Modal';

const intersectionObserverMock = () => ({
    observe: () => null
})
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);


describe('Modal', () => {
    it('opens when open prop is true', () => {
        render(<Modal open={true} setOpen={() => ({})}>foobar</Modal>);

        const textElement = screen.getByText(/foobar/i);
        expect(textElement).toBeInTheDocument();
    });

    it('is not open when open prop is false', () => {
        render(<Modal open={false} setOpen={() => ({})}>foobar</Modal>);

        const textElement = screen.queryByText(/foobar/i);
        expect(textElement).not.toBeInTheDocument();
    });
});

describe('ActionModal', () => {
    it('closes on cancel button click', () => {
        const setOpenMock = jest.fn();

        render(<ActionModal actionName='foo' open={true} setOpen={setOpenMock} onAction={() => ({})} />);

        fireEvent.click(screen.getByText(/Cancel/i));

        expect(setOpenMock).toHaveBeenCalledWith(false);
    });

    it('calls onCancel callback on cancel button click', () => {
        const onCancelMock = jest.fn();

        render(<ActionModal actionName='foo' open={true} setOpen={() => ({})} onCancel={onCancelMock} onAction={() => ({})} />);

        fireEvent.click(screen.getByText(/Cancel/i));

        expect(onCancelMock).toHaveBeenCalledTimes(1);
    });

    it('calls onAction callback on action button click', () => {
        const onActionMock = jest.fn();

        render(<ActionModal actionName='foo' open={true} setOpen={() => ({})} onAction={onActionMock} />);

        fireEvent.click(screen.getByText(/foo/i));

        expect(onActionMock).toHaveBeenCalledTimes(1);
    });
});
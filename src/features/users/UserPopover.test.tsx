import React from 'react';
import { getDummyStore, render, screen, fireEvent } from '../../utility/testUtils';
import UserPopover from './UserPopover';

describe('UserPopover', () => {
    it('renders provided children as button', () => {
        const { dummyData } = getDummyStore();

        render(<UserPopover user={dummyData.user}>foo</UserPopover>);

        const textElement = screen.getByText(/foo/i);
        expect(textElement).toBeInTheDocument();
    });

    it('opens popover on button click', () => {
        const { dummyData } = getDummyStore();

        render(<UserPopover user={dummyData.user}>foo</UserPopover>);

        fireEvent.click(screen.getByRole('button'));

        const textElement = screen.getByText(dummyData.user.username);
        expect(textElement).toBeInTheDocument();
    });
});
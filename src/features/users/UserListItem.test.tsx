import React from 'react';
import { getDummyStore, render, screen, fireEvent } from '../../utility/testUtils';
import UserListItem from './UserListItem';

describe('UserListItem', () => {
    it('shows username for user', () => {
        const { preloadedState, dummyData } = getDummyStore();

        render(<UserListItem user={dummyData.user} />, { preloadedState });

        const textElement = screen.getByText(dummyData.user.username);
        expect(textElement).toBeInTheDocument();
    });

    it('shows star when user is owner', () => {
        const { preloadedState, dummyData } = getDummyStore({ userIsOwner: true });

        const { container } = render(<UserListItem user={dummyData.user} />, { preloadedState });

        const svgElement = container.querySelector('svg.text-yellow-400');
        expect(svgElement).toBeInTheDocument();
    });

    it('does not show star when user is not owner', () => {
        const { preloadedState, dummyData } = getDummyStore({ userIsOwner: false });

        const { container } = render(<UserListItem user={dummyData.user} />, { preloadedState });

        const svgElement = container.querySelector('svg.text-yellow-400');
        expect(svgElement).not.toBeInTheDocument();
    });
});
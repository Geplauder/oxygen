import React from 'react';

import { getDummyStore, render, screen } from '../../utility/testUtils';
import UserInfoSettings from './UserInfoSettings';

describe('UserInfoSettings', () => {
    it('shows current user name', () => {
        const { preloadedState, dummyData } = getDummyStore();

        render(<UserInfoSettings />, { preloadedState });

        const textElement = screen.getByText(new RegExp(dummyData.user.username, "i"));
        expect(textElement).toBeInTheDocument();
    });

    it('is empty div when no server is selected', () => {
        const { container } = render(<UserInfoSettings />);

        expect(container.firstChild).toBeEmptyDOMElement();
    });
});
import React from 'react';

import { getDummyStore, render, screen } from '../../utility/testUtils';
import ServerInfoSettings from './ServerInfoSettings';

describe('ServerInfoSettings', () => {
    it('shows selected server name', () => {
        const { preloadedState, dummyData } = getDummyStore();

        render(<ServerInfoSettings />, { preloadedState });

        const textElement = screen.getByText(new RegExp(dummyData.server.name, "i"));
        expect(textElement).toBeInTheDocument();
    });

    it('is empty div when no server is selected', () => {
        const { container } = render(<ServerInfoSettings />);

        expect(container.firstChild).toBeEmptyDOMElement();
    });
});
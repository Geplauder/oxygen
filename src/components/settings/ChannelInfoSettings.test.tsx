import React from 'react';

import { getDummyStore, render, screen } from '../../utility/testUtils';
import ChannelInfoSettings from './ChannelInfoSettings';

describe('ChannelInfoSettings', () => {
    it('shows selected channel name', () => {
        const { dummyData } = getDummyStore();

        render(<ChannelInfoSettings channel={dummyData.firstChannel} />);

        const textElement = screen.getByText(new RegExp(dummyData.firstChannel.name, "i"));
        expect(textElement).toBeInTheDocument();
    });
});
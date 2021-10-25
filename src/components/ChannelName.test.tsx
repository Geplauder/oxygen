import React from 'react';

import { render, screen } from '@testing-library/react';
import ChannelName from './ChannelName';
import { getDummyStore } from '../utility/testUtils';

describe('ChannelName', () => {
    it('renders channel name', () => {
        const { dummyData } = getDummyStore();

        render(<ChannelName selectedChannel={dummyData.firstChannel} />)

        const textElement = screen.getByText(new RegExp(dummyData.firstChannel.name, "i"));

        expect(textElement).toBeInTheDocument();
    });
});
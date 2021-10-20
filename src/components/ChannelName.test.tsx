import React from 'react';

import { render, screen } from '@testing-library/react';
import faker from 'faker';
import ChannelName from './ChannelName';
import { Channel } from '../types';

const CHANNEL: Channel = {
    id: faker.datatype.uuid(),
    name: faker.lorem.word(),
    server_id: faker.datatype.uuid(),
    created_at: faker.date.past().toString(),
    updated_at: faker.date.past().toString(),
};

describe('ChannelName', () => {
    it('renders channel name', () => {
        render(<ChannelName selectedChannel={CHANNEL} />)

        const textElement = screen.getByText(new RegExp(CHANNEL.name, "i"));

        expect(textElement).toBeInTheDocument();
    });
});
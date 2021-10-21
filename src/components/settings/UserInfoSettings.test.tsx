import React from 'react';

import { render, screen, fireEvent } from '../../utility/testUtils';
import faker from 'faker';
import { RootState } from '../../app/store';
import UserInfoSettings from './UserInfoSettings';

jest.mock('jdenticon', () => ({
    update: () => null,
}));

const getStore = (name: string): Partial<RootState> => ({
    user: {
        user: {
            id: faker.datatype.uuid(),
            username: name,
            created_at: faker.date.past().toString(),
            updated_at: faker.date.past().toString(),
        },
        isConnected: true,
        isWebsocketClosed: false,
    }
});

describe('UserInfoSettings', () => {
    it('shows current user name', () => {
        const name = faker.name.firstName();

        render(<UserInfoSettings />, { preloadedState: getStore(name) });

        const textElement = screen.getByText(new RegExp(name, "i"));
        expect(textElement).toBeInTheDocument();
    });

    it('is empty div when no server is selected', () => {
        const { container } = render(<UserInfoSettings />);

        expect(container.firstChild).toBeEmptyDOMElement();
    });
});
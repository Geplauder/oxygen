import React from 'react';

import { render, screen } from '../../utility/testUtils';
import faker from 'faker';
import ServerInfoSettings from './ServerInfoSettings';
import { RootState } from '../../app/store';

const getStore = (serverName: string): Partial<RootState> => ({
    servers: {
        servers: [
            {
                id: faker.datatype.uuid(),
                name: serverName,
                owner_id: faker.datatype.uuid(),
                created_at: faker.date.past().toString(),
                updated_at: faker.date.past().toString(),
            }
        ],
        selectedServer: 0
    },
});

describe('ServerInfoSettings', () => {
    it('shows selected server name', () => {
        const serverName = faker.name.firstName();

        render(<ServerInfoSettings />, { preloadedState: getStore(serverName) });

        const textElement = screen.getByText(new RegExp(serverName, "i"));
        expect(textElement).toBeInTheDocument();
    });

    it('is empty div when no server is selected', () => {
        const { container } = render(<ServerInfoSettings />);

        expect(container.firstChild).toBeEmptyDOMElement();
    });
});
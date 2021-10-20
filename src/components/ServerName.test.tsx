import React from 'react';

import { render, screen } from '../utility/testUtils';
import faker from 'faker';
import ServerName from './ServerName';

describe('ServerName', () => {
    it('renders server name', () => {
        const serverName = faker.lorem.word();

        render(<ServerName />, {
            preloadedState: {
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
                }
            }
        });

        const textElement = screen.getByText(new RegExp(serverName, "i"));

        expect(textElement).toBeInTheDocument();
    });

    it('shows create channel dropdown item when user is owner', () => {

    });
});
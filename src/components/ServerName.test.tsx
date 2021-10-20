import React from 'react';

import { store } from '../app/store';
import { render, screen } from '@testing-library/react';
import faker from 'faker';
import ServerName from './ServerName';
import { Provider } from 'react-redux';
import { addServer } from '../features/servers/serversSlice';

describe('ServerName', () => {
    it('renders server name', () => {
        const serverName = faker.lorem.word();

        store.dispatch(addServer({
            id: faker.datatype.uuid(),
            name: serverName,
            owner_id: faker.datatype.uuid(),
            created_at: faker.date.past().toString(),
            updated_at: faker.date.past().toString(),
        }));

        render(
            <Provider store={store}>
                <ServerName />
            </Provider>
        );

        const textElement = screen.getByText(new RegExp(serverName, "i"));

        expect(textElement).toBeInTheDocument();
    });

    it('shows create channel dropdown item when user is owner', () => {
        
    });
});
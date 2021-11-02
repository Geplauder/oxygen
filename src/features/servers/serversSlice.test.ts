import faker from 'faker';
import axios from 'axios';
import { rootMiddleware, rootReducer, store } from '../../app/store';
import { addServer, deleteLeaveServerAsync, deleteServer, deleteServerAsync, getServersAsync, postServerAsync, postUpdateServerAsync, putJoinServerAsync, selectServer, updateServer } from './serversSlice';
import { configureStore } from '@reduxjs/toolkit';
import { getDummyStore } from '../../utility/testUtils';
import { ServerFlags } from '../../types';

const GET_SERVERS_SUCCESSFUL_RESPONSE = {
    data: [
        {
            id: faker.datatype.uuid(),
            name: faker.name.firstName(),
            owner_id: faker.datatype.uuid(),
            created_at: faker.date.past().toString(),
            updated_at: faker.date.past().toString(),
        }
    ],
    status: 200,
    statusText: 'Ok',
    headers: {},
    config: {}
};

const GENERIC_SERVER_SUCCESSFUL_RESPONSE = {
    data: {},
    status: 200,
    statusText: 'Ok',
    headers: {},
    config: {}
};

describe('getServersAsync', () => {
    beforeEach(() => {
        jest.mock('axios');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('sends request', async () => {
        axios.get = jest.fn().mockImplementation(() => Promise.resolve(GET_SERVERS_SUCCESSFUL_RESPONSE));

        await store.dispatch(getServersAsync());

        expect(axios.get).toHaveBeenCalledWith('users/servers');
    });

    it('stores servers in state', async () => {
        axios.get = jest.fn().mockImplementation(() => Promise.resolve(GET_SERVERS_SUCCESSFUL_RESPONSE));

        await store.dispatch(getServersAsync());

        expect(store.getState().servers.servers[0].id).toBe(GET_SERVERS_SUCCESSFUL_RESPONSE.data[0].id);
    });
});

describe('postServerAsync', () => {
    beforeEach(() => {
        jest.mock('axios');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('sends request', async () => {
        axios.post = jest.fn().mockImplementation(() => Promise.resolve(GENERIC_SERVER_SUCCESSFUL_RESPONSE));

        await store.dispatch(postServerAsync({ name: 'foobar' }));

        expect(axios.post).toHaveBeenCalledWith('servers', { name: 'foobar' });
    });
});

describe('putJoinServerAsync', () => {
    beforeEach(() => {
        jest.mock('axios');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('sends request', async () => {
        axios.put = jest.fn().mockImplementation(() => Promise.resolve(GENERIC_SERVER_SUCCESSFUL_RESPONSE));

        await store.dispatch(putJoinServerAsync({ inviteCode: 'foobar' }));

        expect(axios.put).toHaveBeenCalledWith('servers/foobar');
    });
});

describe('deleteServerAsync', () => {
    beforeEach(() => {
        jest.mock('axios');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('sends request', async () => {
        axios.delete = jest.fn().mockImplementation(() => Promise.resolve(GENERIC_SERVER_SUCCESSFUL_RESPONSE));

        await store.dispatch(deleteServerAsync({ serverId: 'foobar' }));

        expect(axios.delete).toHaveBeenCalledWith('servers/foobar');
    });
});

describe('deleteLeaveServerAsync', () => {
    beforeEach(() => {
        jest.mock('axios');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('sends request', async () => {
        axios.delete = jest.fn().mockImplementation(() => Promise.resolve(GENERIC_SERVER_SUCCESSFUL_RESPONSE));

        await store.dispatch(deleteLeaveServerAsync({ serverId: 'foobar' }));

        expect(axios.delete).toHaveBeenCalledWith('servers/foobar/users');
    });
});

describe('postUpdateServerAsync', () => {
    beforeEach(() => {
        jest.mock('axios');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('sends request', async () => {
        axios.post = jest.fn().mockImplementation(() => Promise.resolve(GENERIC_SERVER_SUCCESSFUL_RESPONSE));

        await store.dispatch(postUpdateServerAsync({ serverId: 'foobar', name: 'baz' }));

        expect(axios.post).toHaveBeenCalledWith('servers/foobar', { name: 'baz' });
    });
});

describe('serversSlice', () => {
    describe('selectServer', () => {
        it('sets selected server in state', () => {
            const { preloadedState } = getDummyStore();
            const store = configureStore({
                reducer: rootReducer,
                middleware: rootMiddleware,
                preloadedState,
            });

            store.dispatch(selectServer(1));

            expect(store.getState().servers.selectedServer).toBe(1);
        });
    });

    describe('addServer', () => {
        it('stores server in state', () => {
            const { preloadedState } = getDummyStore();
            const store = configureStore({
                reducer: rootReducer,
                middleware: rootMiddleware,
                preloadedState,
            });

            store.dispatch(addServer({
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                owner_id: faker.datatype.uuid(),
                flags: ServerFlags.None,
                created_at: faker.date.past().toString(),
                updated_at: faker.date.past().toString(),
            }));

            expect(store.getState().servers.servers.length).toBe(2);
        });
    });

    describe('deleteServer', () => {
        it('removes server from state', () => {
            const { preloadedState, dummyData } = getDummyStore();
            const store = configureStore({
                reducer: rootReducer,
                middleware: rootMiddleware,
                preloadedState,
            });

            store.dispatch(deleteServer(dummyData.server.id));

            expect(store.getState().servers.servers.length).toBe(0);
        });
    });

    describe('updateServer', () => {
        it('updates server in state', () => {
            const { preloadedState, dummyData } = getDummyStore();

            const store = configureStore({
                reducer: rootReducer,
                middleware: rootMiddleware,
                preloadedState,
            });

            store.dispatch(updateServer({ ...dummyData.server, name: 'foobar' }));

            expect(store.getState().servers.servers[0].name).toBe('foobar');
        });
    });
});
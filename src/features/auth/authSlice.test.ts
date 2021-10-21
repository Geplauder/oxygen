import { rootReducer } from '../../app/store';
import { hydrate, invalidateToken, loginAsync, registerAsync, selectToken } from './authSlice';
import faker from 'faker';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';

const LOGIN_SUCCESSFUL_RESPONSE = {
    data: {
        token: faker.datatype.uuid(),
    },
    status: 200,
    statusText: 'Ok',
    headers: {},
    config: {}
};

const LOGIN_ERROR_RESPONSE = {
    data: {},
    status: 401,
    statusText: 'Unauthorized',
    headers: {},
    config: {}
};

const REGISTER_SUCCESSFUL_RESPONSE = {
    data: {},
    status: 200,
    statusText: 'Ok',
    headers: {},
    config: {}
};

const REGISTER_ERROR_RESPONSE = {
    data: {},
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config: {}
};

describe('loginAsync', () => {
    beforeEach(() => {
        jest.mock('axios');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('sends request', async () => {
        axios.post = jest.fn().mockImplementation(() => Promise.resolve(LOGIN_SUCCESSFUL_RESPONSE));

        const store = configureStore({
            reducer: rootReducer,
        });

        await store.dispatch(loginAsync({ email: 'foo', password: 'bar' }));

        expect(axios.post).toHaveBeenCalledWith('login', { email: 'foo', password: 'bar' });
    });

    it('stores received token in state', async () => {
        axios.post = jest.fn().mockImplementation(() => Promise.resolve(LOGIN_SUCCESSFUL_RESPONSE));

        const store = configureStore({
            reducer: rootReducer,
        });

        await store.dispatch(loginAsync({ email: 'foo', password: 'bar' }));

        expect(store.getState().auth.token).toBe(LOGIN_SUCCESSFUL_RESPONSE.data.token);
    });

    it('rejects with status code on error', async () => {
        axios.post = jest.fn().mockImplementation(() => Promise.reject(LOGIN_ERROR_RESPONSE));

        const store = configureStore({
            reducer: rootReducer,
        });

        const status = await store.dispatch(loginAsync({ email: 'foo', password: 'bar' }));

        expect(status.type).toBe(loginAsync.rejected.type);
    });
});

describe('registerAsync', () => {
    beforeEach(() => {
        jest.mock('axios');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('sends request', async () => {
        axios.post = jest.fn().mockImplementation(() => Promise.resolve(REGISTER_SUCCESSFUL_RESPONSE));

        const store = configureStore({
            reducer: rootReducer,
        });

        await store.dispatch(registerAsync({ name: 'foo', email: 'bar', password: 'baz' }));

        expect(axios.post).toHaveBeenCalledWith('register', { name: 'foo', email: 'bar', password: 'baz' });
    });

    it('rejects with status code on error', async () => {
        axios.post = jest.fn().mockImplementation(() => Promise.reject(REGISTER_ERROR_RESPONSE));

        const store = configureStore({
            reducer: rootReducer,
        });

        const status = await store.dispatch(registerAsync({ name: 'foo', email: 'bar', password: 'baz' }));

        expect(status.type).toBe(registerAsync.rejected.type);
    });
});

describe('loginSlice', () => {
    describe('hydrate', () => {
        it('stores token in state', () => {
            const store = configureStore({
                reducer: rootReducer,
            });

            store.dispatch(hydrate({ token: 'foobar' }));

            expect(store.getState().auth.token).toBe('foobar');
        });

        it('sets default axios authorization header', () => {
            const store = configureStore({
                reducer: rootReducer,
            });

            store.dispatch(hydrate({ token: 'foobar' }));

            expect(axios.defaults.headers.common['Authorization']).toBe('Bearer foobar');
        });
    });

    describe('invalidateToken', () => {
        it('clears token from state', () => {
            const store = configureStore({
                reducer: rootReducer,
            });

            store.dispatch(invalidateToken());

            expect(store.getState().auth.token).toBeNull();
        });

        it('deletes default axios authorization header', () => {
            const store = configureStore({
                reducer: rootReducer,
            });

            store.dispatch(invalidateToken());

            expect(axios.defaults.headers.common['Authorization']).toBeUndefined();
        });
    });
});

describe('selectToken', () => {
    it('selects token from state', () => {
        const store = configureStore({
            reducer: rootReducer,
            preloadedState: {
                auth: {
                    token: 'foobar'
                }
            }
        });

        expect(selectToken(store.getState())).toBe('foobar');
    });
});

import axios from "axios";
import { store } from '../app/store';
import { setupAxios } from "./api";

describe('setupAxios', () => {
    it('sets default authorization header if bearer token is provided', () => {
        setupAxios(store, 'foobar');

        expect(axios.defaults.headers.common['Authorization']).toBe('Bearer foobar');
    });
});
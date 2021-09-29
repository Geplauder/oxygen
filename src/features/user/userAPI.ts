import axios, { AxiosResponse } from 'axios';
import { User } from '../../types';

export function fetchUser(): Promise<AxiosResponse<User>> {
    return axios.get('users');
}
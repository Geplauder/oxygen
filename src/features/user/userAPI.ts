import axios, { AxiosResponse } from 'axios';
import { User } from '../../types';

export function fetchUser(token: string): Promise<AxiosResponse<User>> {
    return axios.get('http://localhost:8000/users', { headers: { authorization: `Bearer ${token}` } });
}
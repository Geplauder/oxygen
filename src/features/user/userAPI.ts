import axios, { AxiosResponse } from 'axios';
import { User } from '../../types';

export function fetchUser(): Promise<AxiosResponse<User>> {
    return axios.get('users');
}

export function postUpdateUser({ name, email, password, currentPassword }: { name?: string, email?: string, password?: string, currentPassword: string }): Promise<AxiosResponse> {
    return axios.post('users', {
        name,
        email,
        password,
        current_password: currentPassword,
    });
}

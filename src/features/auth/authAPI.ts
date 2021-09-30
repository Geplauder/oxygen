import axios, { AxiosResponse } from 'axios';

export function fetchLogin(email: string, password: string): Promise<AxiosResponse<{ token: string }>> {
    return axios.post('login', { email, password });
}
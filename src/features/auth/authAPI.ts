import axios, { AxiosResponse } from 'axios';

export function fetchLogin(email: string, password: string): Promise<AxiosResponse<{ token: string }>> {
    return axios.post('login', { email, password });
}

export function postRegister(name: string, email: string, password: string): Promise<AxiosResponse> {
    return axios.post('register', { name, email, password });
}

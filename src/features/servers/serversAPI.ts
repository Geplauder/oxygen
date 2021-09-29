import axios, { AxiosResponse } from 'axios';
import { Server } from '../../types';

export function fetchServers(): Promise<AxiosResponse<Server[]>> {
    return axios.get('users/servers');
}

export function postServer(name: string): Promise<AxiosResponse> {
    return axios.post('servers', {
        name,
    });
}

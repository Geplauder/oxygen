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

export function putJoinServer(serverId: string): Promise<AxiosResponse> {
    return axios.put(`servers/${serverId}`);
}

export function deleteServer(serverId: string): Promise<AxiosResponse> {
    return axios.delete(`servers/${serverId}`);
}

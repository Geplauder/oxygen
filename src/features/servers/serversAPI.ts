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

export function putJoinServer(inviteCode: string): Promise<AxiosResponse> {
    return axios.put(`servers/${inviteCode}`);
}

export function deleteServer(serverId: string): Promise<AxiosResponse> {
    return axios.delete(`servers/${serverId}`);
}

export function deleteLeaveServer(serverId: string): Promise<AxiosResponse> {
    return axios.delete(`servers/${serverId}/users`);
}

export function postUpdateServer({ serverId, name }: { serverId: string, name?: string }): Promise<AxiosResponse> {
    return axios.post(`servers/${serverId}`, {
        name,
    });
}

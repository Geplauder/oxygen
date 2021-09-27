import axios, { AxiosResponse } from 'axios';
import { Channel } from '../../types';

export function fetchChannels(token: string, serverId: string): Promise<AxiosResponse<Channel[]>> {
    return axios.get(`http://localhost:8000/servers/${serverId}/channels`, { headers: { authorization: `Bearer ${token}` } });
}

export function postChannel(token: string, serverId: string, name: string): Promise<AxiosResponse> {
    return axios.post(`http://localhost:8000/servers/${serverId}/channels`, {
        name,
    }, { headers: { authorization: `Bearer ${token}` } });
}

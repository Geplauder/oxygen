import axios, { AxiosResponse } from 'axios';
import { Channel } from '../../types';

export function fetchChannels(token: string, serverId: string): Promise<AxiosResponse<Channel[]>> {
    return axios.get(`http://localhost:8000/servers/${serverId}/channels`, { headers: { authorization: `Bearer ${token}` } });
}
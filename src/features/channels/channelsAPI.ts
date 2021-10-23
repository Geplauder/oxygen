import axios, { AxiosResponse } from 'axios';
import { Channel } from '../../types';

export function fetchChannels(serverId: string): Promise<AxiosResponse<Channel[]>> {
    return axios.get(`servers/${serverId}/channels`);
}

export function postChannel(serverId: string, name: string): Promise<AxiosResponse> {
    return axios.post(`servers/${serverId}/channels`, {
        name,
    });
}

export function deleteChannel(channelId: string): Promise<AxiosResponse> {
    return axios.delete(`channels/${channelId}`);
}

export function postUpdateChannel({ channelId, name }: { channelId: string, name?: string }): Promise<AxiosResponse> {
    return axios.post(`channels/${channelId}`, {
        name,
    });
}

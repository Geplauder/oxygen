import axios, { AxiosResponse } from 'axios';
import { Message } from '../../types';

export function fetchMessages(channelId: string): Promise<AxiosResponse<Message[]>> {
    return axios.get(`channels/${channelId}/messages`);
}

export function postMessage(channelId: string, content: string): Promise<AxiosResponse> {
    return axios.post(`channels/${channelId}/messages`, {
        content,
    });
}
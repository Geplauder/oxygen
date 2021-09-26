import axios, { AxiosResponse } from 'axios';
import { Message } from '../../types';

export function fetchMessages(token: string, channelId: string): Promise<AxiosResponse<Message[]>> {
    return axios.get(`http://localhost:8000/channels/${channelId}/messages`, { headers: { authorization: `Bearer ${token}` } });
}

export function postMessage(token: string, channelId: string, content: string): Promise<AxiosResponse> {
    return axios.post(`http://localhost:8000/channels/${channelId}/messages`, {
        content,
    }, { headers: { authorization: `Bearer ${token}` } });
}
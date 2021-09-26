import axios, { AxiosResponse } from 'axios';
import { Message } from '../../types';

export function fetchMessages(token: string, channelId: string): Promise<AxiosResponse<Message[]>> {
    return axios.get(`http://localhost:8000/channels/${channelId}/messages`, { headers: { authorization: `Bearer ${token}` } });
}
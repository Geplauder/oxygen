import axios, { AxiosResponse } from 'axios';
import { ServerInvite } from '../../types';

export function fetchServerInvites(serverId: string): Promise<AxiosResponse<ServerInvite[]>> {
    return axios.get(`servers/${serverId}/invites`);
}
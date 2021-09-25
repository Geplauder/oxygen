import axios, { AxiosResponse } from 'axios';
import { Server } from '../../types';

export function fetchServers(token: string): Promise<AxiosResponse<Server[]>> {
    return axios.get('http://localhost:8000/users/servers', { headers: { authorization: `Bearer ${token}` } });
}
import axios, { AxiosResponse } from "axios";
import { User } from "../../types";

export function fetchUsers(token: string, serverId: string): Promise<AxiosResponse<User[]>> {
    return axios.get(`http://localhost:8000/servers/${serverId}/users`, { headers: { authorization: `Bearer ${token}` } });
}
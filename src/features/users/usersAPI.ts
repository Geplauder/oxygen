import axios, { AxiosResponse } from "axios";
import { User } from "../../types";

export function fetchUsers(serverId: string): Promise<AxiosResponse<User[]>> {
    return axios.get(`servers/${serverId}/users`);
}
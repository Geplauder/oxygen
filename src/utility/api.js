import axios from "axios";

export const getAxios = (bearerToken) => {
    return axios.create({
        baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
        headers: { 'Authorization': `Bearer ${bearerToken}` }
    });
};
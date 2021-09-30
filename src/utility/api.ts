import { EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { invalidateToken } from "../features/auth/authSlice";

export const setupAxios = (store: EnhancedStore, bearer: string | null) => {
    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

    if (bearer) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${bearer}`;
    }

    axios.interceptors.response.use(response => response, error => {
        if (error.response.status === 401) {
            store.dispatch(invalidateToken());

            return Promise.reject(error);
        }

        return Promise.resolve(error);
    });
}

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { fetchLogin, postRegister } from "./authAPI";

export interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: null,
};

export const loginAsync = createAsyncThunk(
    "auth/loginAsync",
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await fetchLogin(email, password);

            return response.data;
        } catch (error: any) {
            return rejectWithValue({ status: error.response.status });
        }
    }
);

export const registerAsync = createAsyncThunk(
    "auth/registerAsync",
    async ({ name, email, password }: { name: string, email: string, password: string }) => {
        await postRegister(name, email, password);
    }
)

export const loginSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        hydrate: (state, action: PayloadAction<{ token: string }>) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
            state.token = action.payload.token;
        },
        invalidateToken: (state) => {
            axios.defaults.headers.common['Authorization'] = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
                state.token = action.payload.token;
            });
    }
});

export const selectToken = (state: RootState): string | null => state.auth.token;

export const { hydrate, invalidateToken } = loginSlice.actions;

export default loginSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchLogin } from "./loginAPI";

export interface LoginState {
    token: string | null;
}

const initialState: LoginState = {
    token: null,
};

export const loginAsync = createAsyncThunk(
    "login/loginAsync",
    async ({ email, password }: { email: string, password: string }) => {
        const response = await fetchLogin(email, password);

        return response.data;
    }
);

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        hydrate: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.token = action.payload.token;
            });
    }
});

export const selectToken = (state: RootState): string | null => state.login.token;

export const { hydrate } = loginSlice.actions;

export default loginSlice.reducer;

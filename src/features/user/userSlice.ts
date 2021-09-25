import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../types";
import { fetchUser } from "./userAPI";

export interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

export const getUserAsync = createAsyncThunk(
    "login/getUserAsync",
    async ({ token }: { token: string }) => {
        const response = await fetchUser(token);

        return response.data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserAsync.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    }
});

export const selectUser = (state: RootState): User | null => state.user.user;

export default userSlice.reducer;
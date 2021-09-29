import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../types";
import { fetchUsers } from "./usersAPI";

export interface UsersState {
    users: User[],
}

const initialState: UsersState = {
    users: [],
};

export const getUsersAsync = createAsyncThunk(
    "users/getUsersAsync",
    async ({ token, serverId }: { token: string, serverId: string }) => {
        const response = await fetchUsers(token, serverId);

        return response.data;
    }
);

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.users = action.payload;
            });
    }
});

export const selectUsers = (state: RootState): { users: User[] } => state.users;

export default usersSlice.reducer;

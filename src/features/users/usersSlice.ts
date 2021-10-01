import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    async ({ serverId }: { serverId: string }) => {
        const response = await fetchUsers(serverId);

        return response.data;
    }
);

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.users = action.payload;
            });
    }
});

export const { addUser } = usersSlice.actions;

export const selectUsers = (state: RootState): { users: User[] } => state.users;

export default usersSlice.reducer;

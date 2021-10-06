import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../types";
import { fetchUsers } from "./usersAPI";

export interface UsersState {
    users: { [serverId: string]: User[] },
}

const initialState: UsersState = {
    users: {},
};

export const getUsersAsync = createAsyncThunk(
    "users/getUsersAsync",
    async ({ serverId }: { serverId: string }) => {
        const response = await fetchUsers(serverId);

        return { serverId, data: response.data };
    }
);

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<{ serverId: string, user: User }>) => {
            if (state.users[action.payload.serverId]) {
                state.users[action.payload.serverId].push(action.payload.user);
            } else {
                state.users[action.payload.serverId] = [action.payload.user];
            }
        },
        clearUsers: (state) => {
            state.users = {};
        },
        deleteUsersForServer: (state, action: PayloadAction<string>) => {
            delete state.users[action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.users[action.payload.serverId] = action.payload.data;
            });
    }
});

export const { addUser, clearUsers, deleteUsersForServer } = usersSlice.actions;

export const selectUsers = (state: RootState): { users: { [serverId: string]: User[] } } => state.users;

export default usersSlice.reducer;

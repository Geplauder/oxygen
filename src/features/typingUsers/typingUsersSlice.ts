import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../types";

export interface TypingUsersState {
    users: { [channelId: string]: User[] },
}

const initialState: TypingUsersState = {
    users: {},
};

export const typingUsersSlice = createSlice({
    name: "typingUsers",
    initialState,
    reducers: {
        addTypingUser: (state, action: PayloadAction<{ user: User, channelId: string }>) => {
            if (state.users[action.payload.channelId]) {
                state.users[action.payload.channelId].push(action.payload.user);
            } else {
                state.users[action.payload.channelId] = [action.payload.user];
            }
        },
        removeTypingUser: (state, action: PayloadAction<{ user: User, channelId: string }>) => {
            const typingChannelUsers = state.users[action.payload.channelId];

            state.users[action.payload.channelId] = typingChannelUsers.filter(x => x.id !== action.payload.user.id);
        }
    }
});

export const { addTypingUser, removeTypingUser } = typingUsersSlice.actions;

export const selectTypingUsers = (state: RootState): { [channelId: string]: User[] } => {
    return state.typingUsers.users;
};

export default typingUsersSlice.reducer;
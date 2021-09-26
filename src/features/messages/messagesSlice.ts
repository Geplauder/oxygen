import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Message } from "../../types";
import { fetchMessages } from "./messagesAPI";

export interface MessageState {
    messages: Message[],
}

const initialState: MessageState = {
    messages: [],
};

export const getMessagesAsync = createAsyncThunk(
    "messages/getMessagesAsync",
    async ({ token, channelId }: { token: string, channelId: string }) => {
        const response = await fetchMessages(token, channelId);

        return response.data;
    }
);

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMessagesAsync.fulfilled, (state, action) => {
                state.messages = action.payload;
            });
    }
});

export const selectMessages = (state: RootState): { messages: Message[] } => state.messages;

export default messagesSlice.reducer;
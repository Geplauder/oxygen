import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { string } from "prop-types";
import { RootState } from "../../app/store";
import { Message } from "../../types";
import { fetchMessages, postMessage } from "./messagesAPI";

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

export const postMessageAsync = createAsyncThunk(
    "messages/postMessageAsync",
    async ({ token, channelId, content }: { token: string, channelId: string, content: string }) => {
        await postMessage(token,  channelId, content);
    }
)

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
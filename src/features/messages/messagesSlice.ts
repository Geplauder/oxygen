import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Message } from "../../types";
import { fetchMessages, postMessage } from "./messagesAPI";

export interface MessageState {
    messages: { [channelId: string]: Message[] },
}

const initialState: MessageState = {
    messages: {},
};

export const getMessagesAsync = createAsyncThunk(
    "messages/getMessagesAsync",
    async ({ channelId }: { channelId: string }) => {
        const response = await fetchMessages(channelId);

        return { channelId, data: response.data };
    }
);

export const postMessageAsync = createAsyncThunk(
    "messages/postMessageAsync",
    async ({ channelId, content }: { channelId: string, content: string }) => {
        await postMessage(channelId, content);
    }
)

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            if (state.messages[action.payload.channel_id]) {
                state.messages[action.payload.channel_id].push(action.payload);
            } else {
                state.messages[action.payload.channel_id] = [action.payload];
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessagesAsync.fulfilled, (state, action) => {
                state.messages[action.payload.channelId] = action.payload.data;
            });
    }
});

export const selectMessages = (state: RootState): { messages: { [channelId: string]: Message[] } } => state.messages;

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
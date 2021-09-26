import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Channel } from "../../types";
import { getMessagesAsync } from "../messages/messagesSlice";
import { fetchChannels } from "./channelsAPI";

export interface ChannelState {
    channels: Channel[],
    selectedChannel: Channel | null,
}

const initialState: ChannelState = {
    channels: [],
    selectedChannel: null,
};

export const getChannelsAsync = createAsyncThunk(
    "channels/getChannelsAsync",
    async ({ token, serverId }: { token: string, serverId: string }, { dispatch }) => {
        const response = await fetchChannels(token, serverId);

        for (const channel of response.data) {
            dispatch(getMessagesAsync({ token, channelId: channel.id }));
        }

        return response.data;
    }
);

export const channelsSlice = createSlice({
    name: "channels",
    initialState,
    reducers: {
        selectChannel: (state, action: PayloadAction<Channel>) => {
            state.selectedChannel = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChannelsAsync.fulfilled, (state, action) => {
                state.selectedChannel = action.payload[0];
                state.channels = action.payload;
            });
    }
});

export const { selectChannel } = channelsSlice.actions;

export const selectChannels = (state: RootState): { channels: Channel[], selectedChannel: Channel | null } => state.channels;

export default channelsSlice.reducer;
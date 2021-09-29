import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Channel } from "../../types";
import { getMessagesAsync } from "../messages/messagesSlice";
import { fetchChannels, postChannel } from "./channelsAPI";

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
    async ({ serverId }: { serverId: string }, { dispatch }) => {
        const response = await fetchChannels(serverId);

        for (const channel of response.data) {
            dispatch(getMessagesAsync({ channelId: channel.id }));
        }

        return response.data;
    }
);

export const postChannelAsync = createAsyncThunk(
    "channels/postChannelAsync",
    async ({ serverId, name }: { serverId: string, name: string }) => {
        await postChannel(serverId, name);
    }
)

export const channelsSlice = createSlice({
    name: "channels",
    initialState,
    reducers: {
        selectChannel: (state, action: PayloadAction<Channel>) => {
            state.selectedChannel = action.payload;
        },
        addChannel: (state, action: PayloadAction<Channel>) => {
            state.channels.push(action.payload);
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

export const { selectChannel, addChannel } = channelsSlice.actions;

export const selectChannels = (state: RootState): { channels: Channel[], selectedChannel: Channel | null } => state.channels;

export default channelsSlice.reducer;
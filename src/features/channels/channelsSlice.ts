import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Channel } from "../../types";
import { getMessagesAsync } from "../messages/messagesSlice";
import { fetchChannels, postChannel } from "./channelsAPI";

export interface ChannelState {
    channels: { [serverId: string]: Channel[] },
    selectedChannel: Channel | null,
}

const initialState: ChannelState = {
    channels: {},
    selectedChannel: null,
};

export const getChannelsAsync = createAsyncThunk(
    "channels/getChannelsAsync",
    async ({ serverId }: { serverId: string }, { dispatch }) => {
        const response = await fetchChannels(serverId);

        for (const channel of response.data) {
            dispatch(getMessagesAsync({ channelId: channel.id }));
        }

        return { serverId, data: response.data };
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
            if (state.channels[action.payload.server_id]) {
                state.channels[action.payload.server_id].push(action.payload);
            } else {
                state.channels[action.payload.server_id] = [action.payload];
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChannelsAsync.fulfilled, (state, action) => {
                if (state.selectedChannel === null) {
                    state.selectedChannel = action.payload.data[0];
                }

                state.channels[action.payload.serverId] = action.payload.data;
            });
    }
});

export const { selectChannel, addChannel } = channelsSlice.actions;

export const selectChannels = (state: RootState): { channels: { [serverId: string]: Channel[] }, selectedChannel: Channel | null } => state.channels;

export default channelsSlice.reducer;
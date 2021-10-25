import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Channel } from "../../types";
import { deleteChannel, fetchChannels, postChannel, postUpdateChannel } from "./channelsAPI";

export interface ChannelState {
    channels: { [serverId: string]: { channels: Channel[], selectedChannel: number } },
}

const initialState: ChannelState = {
    channels: {},
};

export const getChannelsAsync = createAsyncThunk(
    "channels/getChannelsAsync",
    async ({ serverId }: { serverId: string }) => {
        const response = await fetchChannels(serverId);

        return { serverId, data: response.data };
    }
);

export const postChannelAsync = createAsyncThunk(
    "channels/postChannelAsync",
    async ({ serverId, name }: { serverId: string, name: string }, { rejectWithValue }) => {
        try {
            await postChannel(serverId, name);
        } catch (error: any) {
            return rejectWithValue({ status: error.response.status, data: error.response.data });
        }
    }
)

export const deleteChannelAsync = createAsyncThunk(
    "channels/deleteChannelAsync",
    async ({ channelId }: { channelId: string }, { rejectWithValue }) => {
        try {
            await deleteChannel(channelId);
        } catch (error: any) {
            return rejectWithValue({ status: error.response.status, data: error.response.data });
        }
    }
);

export const postUpdateChannelAsync = createAsyncThunk(
    "channels/postUpdateChannelAsync",
    async (payload: { channelId: string, name?: string }, { rejectWithValue }) => {
        try {
            await postUpdateChannel(payload);
        } catch (error: any) {
            return rejectWithValue({ status: error.response.status });
        }
    }
);

export const channelsSlice = createSlice({
    name: "channels",
    initialState,
    reducers: {
        selectChannel: (state, action: PayloadAction<{ serverId: string, index: number }>) => {
            if (state.channels[action.payload.serverId]) {
                state.channels[action.payload.serverId].selectedChannel = action.payload.index;
            }
        },
        addChannel: (state, action: PayloadAction<Channel>) => {
            if (state.channels[action.payload.server_id]) {
                state.channels[action.payload.server_id].channels.push(action.payload);
            } else {
                state.channels[action.payload.server_id] = {
                    channels: [action.payload],
                    selectedChannel: 0,
                };
            }
        },
        clearChannels: (state) => {
            state.channels = {};
        },
        deleteChannelsForServer: (state, action: PayloadAction<string>) => {
            delete state.channels[action.payload];
        },
        updateChannel: (state, action: PayloadAction<Channel>) => {
            const channelIndex = state.channels[action.payload.server_id].channels.findIndex(x => x.id === action.payload.id);

            state.channels[action.payload.server_id].channels[channelIndex] = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChannelsAsync.fulfilled, (state, action) => {
                state.channels[action.payload.serverId] = {
                    channels: action.payload.data,
                    selectedChannel: 0,
                };
            });
    }
});

export const { selectChannel, addChannel, clearChannels, deleteChannelsForServer, updateChannel } = channelsSlice.actions;

export const selectChannels = (state: RootState): { [serverId: string]: { channels: Channel[], selectedChannel: number } } => state.channels.channels;

export const selectCurrentChannels = (state: RootState): { channels: Channel[], selectedChannel: number } | null => {
    return state.channels.channels[state.servers.servers[state.servers.selectedServer]?.id] ?? null;
};

export const selectSelectedChannel = (state: RootState): Channel | null => {
    const entry = state.channels.channels[state.servers.servers[state.servers.selectedServer]?.id];

    return entry?.channels[entry.selectedChannel] ?? null;
};

export default channelsSlice.reducer;
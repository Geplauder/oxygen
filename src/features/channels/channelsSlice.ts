import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Channel } from "../../types";

export interface ChannelState {
    selectedChannel: Channel | null,
}

const initialState: ChannelState = {
    selectedChannel: null,
};

// export const getChannelsAsync = createAsyncThunk(
//     "channels/getChannelsAsync",
//     async ({ token, serverId }: { token: string, serverId: string }) => {
//         const response = await fetchChannels(token, serverId);

//         return response.data;
//     }
// );

export const channelsSlice = createSlice({
    name: "channels",
    initialState,
    reducers: {
        selectChannel: (state, action: PayloadAction<Channel>) => {
            state.selectedChannel = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getChannelsAsync.fulfilled, (state, action) => {
    //             state.selectedChannel = action.payload[0];
    //             state.channels = action.payload;
    //         });
    // }
});

export const { selectChannel } = channelsSlice.actions;

export const selectChannels = (state: RootState): { selectedChannel: Channel | null } => state.channels;

export default channelsSlice.reducer;
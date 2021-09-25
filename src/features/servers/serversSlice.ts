import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Server } from "../../types";
import { fetchServers } from "./serversAPI";

export interface ServerState {
    servers: Server[];
    selectedServer: Server | null;
}

const initialState: ServerState = {
    servers: [],
    selectedServer: null,
};

export const getServersAsync = createAsyncThunk(
    "servers/getServersAsync",
    async ({ token }: { token: string }) => {
        const response = await fetchServers(token);

        return response.data;
    }
);

export const serversSlice = createSlice({
    name: "servers",
    initialState,
    reducers: {
        selectServer: (state, action: PayloadAction<Server>) => {
            state.selectedServer = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getServersAsync.fulfilled, (state, action) => {
                state.selectedServer = action.payload[0];
                state.servers = action.payload;
            });
    }
});

export const { selectServer } = serversSlice.actions;

export const selectServers = (state: RootState): { servers: Server[], selectedServer: Server | null } => state.servers;

export default serversSlice.reducer;

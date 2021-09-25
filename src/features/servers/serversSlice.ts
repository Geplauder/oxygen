import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Server } from "../../types";

export interface ServerState {
    servers: Server[];
    selectedServer: Server | null;
}

const initialState: ServerState = {
    servers: [],
    selectedServer: null,
};

export const serversSlice = createSlice({
    name: "servers",
    initialState,
    reducers: {
        selectServer: (state, action: PayloadAction<Server>) => {
            state.selectedServer = action.payload;
        }
    },
});

export const { selectServer } = serversSlice.actions;

export const selectServers = (state: RootState): { servers: Server[], selectedServer: Server | null } => state.servers;

export default serversSlice.reducer;

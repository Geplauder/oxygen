
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Server } from "../../types";
import { fetchServers, postServer } from "./serversAPI";

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

export const postServerAsync = createAsyncThunk(
    "servers/postServerAsync",
    async ({ token, name }: { token: string, name: string }, { dispatch }) => {
        await postServer(token, name);

        dispatch(getServersAsync({ token }));
    }
)

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
                if (action.payload.length > 0 && state.selectedServer === null) {
                    state.selectedServer = action.payload[0];
                }

                state.servers = action.payload;
            });
    }
});

export const { selectServer } = serversSlice.actions;

export const selectServers = (state: RootState): { servers: Server[], selectedServer: Server | null } => state.servers;

export default serversSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Server } from "../../types";
import { clearChannels, getChannelsAsync } from "../channels/channelsSlice";
import { clearMessages } from "../messages/messagesSlice";
import { clearUsers, getUsersAsync } from "../users/usersSlice";
import { deleteLeaveServer, deleteServer as deleteServerApi, fetchServers, postServer, putJoinServer } from "./serversAPI";

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
    async (_, { dispatch }) => {
        dispatch(clearMessages());
        dispatch(clearUsers());
        dispatch(clearChannels());

        const response = await fetchServers();

        for (const server of response.data) {
            dispatch(getChannelsAsync({ serverId: server.id }));
            dispatch(getUsersAsync({ serverId: server.id }));
        }

        return response.data;
    }
);

export const postServerAsync = createAsyncThunk(
    "servers/postServerAsync",
    async ({ name }: { name: string }) => {
        await postServer(name);
    }
);

export const putJoinServerAsync = createAsyncThunk(
    "servers/putJoinServerAsync",
    async ({ serverId }: { serverId: string }) => {
        await putJoinServer(serverId);
    }
);

export const deleteServerAsync = createAsyncThunk(
    "servers/deleteServerAsync",
    async ({ serverId }: { serverId: string }) => {
        await deleteServerApi(serverId);
    }
);

export const deleteLeaveServerAsync = createAsyncThunk(
    "servers/deleteLeaveServerAsync",
    async ({ serverId }: { serverId: string }) => {
        await deleteLeaveServer(serverId);
    }
)

export const serversSlice = createSlice({
    name: "servers",
    initialState,
    reducers: {
        selectServer: (state, action: PayloadAction<Server>) => {
            state.selectedServer = action.payload;
        },
        addServer: (state, action: PayloadAction<Server>) => {
            state.servers.push(action.payload);
        },
        deleteServer: (state, action: PayloadAction<string>) => {
            state.servers = state.servers.filter(x => x.id !== action.payload);

            if (state.selectedServer?.id === action.payload) {
                state.selectedServer = state.servers[0];
            }
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

export const { selectServer, addServer, deleteServer } = serversSlice.actions;

export const selectServers = (state: RootState): { servers: Server[], selectedServer: Server | null } => state.servers;

export default serversSlice.reducer;
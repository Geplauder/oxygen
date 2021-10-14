
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Server } from "../../types";
import { clearChannels, getChannelsAsync } from "../channels/channelsSlice";
import { clearMessages } from "../messages/messagesSlice";
import { clearUsers, getUsersAsync } from "../users/usersSlice";
import { deleteLeaveServer, deleteServer as deleteServerApi, fetchServers, postServer, postUpdateServer, putJoinServer } from "./serversAPI";

export interface ServerState {
    servers: Server[];
    selectedServer: number,
}

const initialState: ServerState = {
    servers: [],
    selectedServer: 0,
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
    async ({ name }: { name: string }, { rejectWithValue }) => {
        try {
            await postServer(name);
        } catch (error: any) {
            return rejectWithValue({ status: error.response.status, data: error.response.data });
        }
    }
);

export const putJoinServerAsync = createAsyncThunk(
    "servers/putJoinServerAsync",
    async ({ serverId }: { serverId: string }, { rejectWithValue }) => {
        try {
            await putJoinServer(serverId);
        } catch (error: any) {
            return rejectWithValue({ status: error.response.status, data: error.response.data });
        }
    }
);

export const deleteServerAsync = createAsyncThunk(
    "servers/deleteServerAsync",
    async ({ serverId }: { serverId: string }, { rejectWithValue }) => {
        try {
            await deleteServerApi(serverId);
        } catch (error: any) {
            return rejectWithValue({ status: error.response.status, data: error.response.data });
        }
    }
);

export const deleteLeaveServerAsync = createAsyncThunk(
    "servers/deleteLeaveServerAsync",
    async ({ serverId }: { serverId: string }) => {
        await deleteLeaveServer(serverId);
    }
);

export const postUpdateServerAsync = createAsyncThunk(
    "servers/postUpdateServerAsync",
    async (payload: { serverId: string, name?: string }, { rejectWithValue }) => {
        try {
            await postUpdateServer(payload);
        } catch (error: any) {
            return rejectWithValue({ status: error.response.status });
        }
    }
);

export const serversSlice = createSlice({
    name: "servers",
    initialState,
    reducers: {
        selectServer: (state, action: PayloadAction<number>) => {
            state.selectedServer = action.payload;
        },
        addServer: (state, action: PayloadAction<Server>) => {
            state.servers.push(action.payload);
        },
        deleteServer: (state, action: PayloadAction<string>) => {
            const serverIndex = state.servers.findIndex(x => x.id === action.payload);

            state.servers = state.servers.filter(x => x.id !== action.payload);

            if (state.selectedServer === serverIndex) {
                state.selectedServer = 0;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getServersAsync.fulfilled, (state, action) => {
                state.servers = action.payload;
            });
    }
});

export const { selectServer, addServer, deleteServer } = serversSlice.actions;

export const selectServers = (state: RootState): { servers: Server[], selectedServer: Server | null } => { return { servers: state.servers.servers, selectedServer: state.servers.servers[state.servers.selectedServer] ?? null } }

export default serversSlice.reducer;
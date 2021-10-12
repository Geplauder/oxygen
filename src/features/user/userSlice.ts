import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../types";
import { fetchUser, postUpdateUser } from "./userAPI";

export interface UserState {
    user: User | null;
    isConnected: boolean;
    isWebsocketClosed: boolean;
}

const initialState: UserState = {
    user: null,
    isConnected: false,
    isWebsocketClosed: false,
};

export const getUserAsync = createAsyncThunk(
    "login/getUserAsync",
    async () => {
        const response = await fetchUser();

        return response.data;
    }
);

export const postUpdateUserAsync = createAsyncThunk(
    "user/postUpdateUserAsync",
    async (payload: { name?: string, email?: string, password?: string, currentPassword: string }, { dispatch, rejectWithValue }) => {
        try {
            await postUpdateUser(payload);
        } catch (error: any) {
            return rejectWithValue({ status: error.response.status });
        }

        dispatch(getUserAsync());
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsConnected: (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                state.isWebsocketClosed = false;
            }

            state.isConnected = action.payload;
        },
        setIsWebsocketClosed: (state, action: PayloadAction<boolean>) => {
            state.isWebsocketClosed = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserAsync.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    }
});

export const selectUser = (state: RootState): { user: User | null, isConnected: boolean, isWebsocketClosed: boolean } => state.user;

export const { setIsConnected, setIsWebsocketClosed } = userSlice.actions;

export default userSlice.reducer;
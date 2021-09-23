import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        bearerToken: null,
    },
    reducers: {
        hydrate: (_, action) => {
            return action.payload;
        },
        setBearerToken: (state, action) => {
            state.bearerToken = action.payload;
        }
    }
})

export const { hydrate, setBearerToken } = authSlice.actions

export default authSlice.reducer
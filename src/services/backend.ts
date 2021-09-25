import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';
import { Channel, Message, Server } from '../types';

export const backendApi = createApi({
    reducerPath: 'backendApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/', prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${(getState() as RootState).login.token}`);
            return headers;
        }
    }),
    tagTypes: ['User Servers', 'Channels', 'Messages'],
    endpoints: (builders) => ({
        getServers: builders.query<Server[], string>({
            query: () => 'users/servers',
            providesTags: ['User Servers'],
        }),
        getChannels: builders.query<Channel[], string>({
            query: (id) => `servers/${id}/channels`,
            providesTags: (result, error, id) => [{ type: 'Channels', id }],
        }),
        getMessages: builders.query<Message[], string>({
            query: (id) => `channels/${id}/messages`,
            providesTags: (result, error, id) => [{ type: 'Messages', id }],
        })
    }),
})

export const { useGetServersQuery, useGetChannelsQuery, useGetMessagesQuery } = backendApi;
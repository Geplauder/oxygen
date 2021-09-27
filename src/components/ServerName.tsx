import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import CreateChannel from '../features/channels/CreateChannel';
import { selectToken } from '../features/login/loginSlice';
import { selectServers } from '../features/servers/serversSlice';

export default function ServerName(): JSX.Element {
    const { selectedServer } = useAppSelector(selectServers);
    const token = useAppSelector(selectToken);

    if (token === null) {
        return <Redirect to='/login' />;
    }
    return (
        <div className="flex items-center h-12 border-b border-gray-800">
            <p className='flex-1 mx-4 text-white text-xl font-semibold select-none'>{selectedServer?.name}</p>
            <CreateChannel token={token} selectedServer={selectedServer} />
        </div>
    );
}
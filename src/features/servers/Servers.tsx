import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CreateServer from './CreateServer';
import { getServersAsync, selectServer, selectServers } from './serversSlice';
import Jdenticon from '../../components/Jdenticon';

export default function Servers(): JSX.Element {
    const dispatch = useAppDispatch();

    const { selectedServer, servers } = useAppSelector(selectServers);

    useEffect(() => {
        dispatch(getServersAsync());
    }, []);

    return (
        <>
            <div className="flex flex-col overflow-y-auto items-center space-y-4 py-4 bg-servers w-20 h-screen no-scrollbar">
                {servers && servers.map((server, idx) => (
                    <div key={idx} onClick={() => dispatch(selectServer(server))} className="cursor-pointer">
                        <Jdenticon value={server.id} className={classNames('w-16 h-16 rounded-full', { 'border-2': server.id === selectedServer?.id })} />
                    </div>
                ))}
                <CreateServer />
            </div>
        </>
    );
}
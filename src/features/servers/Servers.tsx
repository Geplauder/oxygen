import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getServersAsync, selectServer, selectServers } from './serversSlice';
import Jdenticon from '../../components/Jdenticon';
import AddServer from './AddServer';
import Tooltip from '../../components/Tooltip';

export default function Servers(): JSX.Element {
    const dispatch = useAppDispatch();

    const { selectedServer, servers } = useAppSelector(selectServers);

    useEffect(() => {
        dispatch(getServersAsync()).then(x => console.log(x));
    }, []);

    return (
        <>
            <div className="flex flex-col overflow-y-auto items-center space-y-4 py-4 bg-servers w-20 h-screen no-scrollbar">
                {servers && servers.map((server, idx) => (
                    <Tooltip key={idx} content={server.name} placement="right" >
                        <div onClick={() => dispatch(selectServer(server))} className="cursor-pointer">
                            <Jdenticon value={server.id} className={classNames('w-16 h-16 rounded-full', { 'border-2': server.id === selectedServer?.id })} />
                        </div>
                    </Tooltip>
                ))}
                <AddServer />
            </div>
        </>
    );
}
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectServers } from './serversSlice';
import AddServer from './AddServer';
import ServerListItem from './ServerListItem';

export default function ServerList(): JSX.Element {
    const { servers } = useAppSelector(selectServers);

    return (
        <>
            <div className="flex flex-col overflow-y-auto items-center space-y-4 py-4 bg-main w-[6.5rem] h-screen no-scrollbar border-r border-main-black">
                {servers && servers.map((server, idx) => (
                    <ServerListItem server={server} idx={idx} key={idx} />
                ))}
                <AddServer />
            </div>
        </>
    );
}
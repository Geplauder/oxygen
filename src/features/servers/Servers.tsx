import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectServer, selectServers } from './serversSlice';
import Jdenticon from '../../components/Jdenticon';
import AddServer from './AddServer';
import Tooltip from '../../components/Tooltip';

export default function Servers(): JSX.Element {
    const dispatch = useAppDispatch();

    const { selectedServer, servers } = useAppSelector(selectServers);

    return (
        <>
            <div className="flex flex-col overflow-y-auto items-center space-y-4 py-4 bg-main w-[6.5rem] h-screen no-scrollbar border-r border-main-black">
                {servers && servers.map((server, idx) => (
                    <Tooltip key={idx} content={server.name} placement="right" >
                        <div onClick={() => dispatch(selectServer(idx))} className="cursor-pointer">
                            <div className={classNames('flex items-center justify-center w-[4.5rem] h-[4.5rem] bg-main rounded-full', server.id === selectedServer?.id ? 'border-[3px] border-indigo-500' : 'hover:border-2 hover:border-white')}>
                                <Jdenticon value={server.id} className='w-14 h-14 rounded-full' />
                            </div>
                        </div>
                    </Tooltip>
                ))}
                <AddServer />
            </div>
        </>
    );
}
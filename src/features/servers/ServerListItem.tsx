import { BadgeCheckIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Jdenticon from '../../components/Jdenticon';
import Tooltip from '../../components/Tooltip';
import { Server, ServerFlags } from '../../types';
import { selectServer, selectServers } from './serversSlice';

export default function ServerListItem({ server, idx }: { server: Server, idx: number }): JSX.Element {
    const dispatch = useAppDispatch();

    const { selectedServer } = useAppSelector(selectServers);

    const tooltipContent = <div className='flex'>
        {(server.flags & ServerFlags.Verified) > 0 && (
            <BadgeCheckIcon className='w-5 h-5 mr-1.5 mt-0.5' />
        )}
        {server.name}
    </div>;

    return (
        <Tooltip content={tooltipContent} placement="right">
            <div onClick={() => dispatch(selectServer(idx))} className="cursor-pointer">
                <div className={classNames('flex items-center justify-center w-[4.5rem] h-[4.5rem] bg-main rounded-full', server.id === selectedServer?.id ? 'border-[3px] border-indigo-500' : 'hover:border-2 hover:border-white')}>
                    <Jdenticon value={server.id} className='w-14 h-14 rounded-full' />
                </div>
            </div>
        </Tooltip>
    );
}
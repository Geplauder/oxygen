import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ServerName from '../../components/ServerName';
import Messages from '../messages/Messages';
import { selectServers } from '../servers/serversSlice';
import User from '../user/User';
import Users from '../users/Users';
import { selectChannel, selectCurrentChannels } from './channelsSlice';

export default function Channels(): JSX.Element {
    const dispatch = useAppDispatch();

    const { selectedServer } = useAppSelector(selectServers);
    const currentChannels = useAppSelector(selectCurrentChannels);

    return (
        <div className='flex w-full'>
            <div className='bg-main border-r border-main-black w-64 flex flex-col'>
                <ServerName />
                <div className='flex flex-1 overflow-y-auto scrollbar scrollbar-hidden flex-col space-y-2 my-2'>
                    {selectedServer && currentChannels && currentChannels.channels.map((channel, idx) => (
                        <div key={idx} onClick={() => dispatch(selectChannel({ serverId: selectedServer.id, index: idx }))}
                            className={classNames('text-white cursor-pointer font-semibold py-1.5 border-l-2 border-transparent',
                                currentChannels.selectedChannel === idx
                                    ? 'bg-main-accent bg-opacity-25 border-l-2 border-main-accent'
                                    : 'hover:bg-main-accent hover:bg-opacity-10 hover:border-l-2 hover:border-main-accent hover:border-opacity-50')}
                        >
                            <p className='px-4 text-lg select-none'>
                                <span># </span>
                                {channel.name}
                            </p>
                        </div>
                    ))}
                </div>
                <User />
            </div>
            <Messages />
            <Users />
        </div>
    );
}
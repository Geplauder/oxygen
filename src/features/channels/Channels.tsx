import { CogIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ServerName from '../../components/ServerName';
import Tooltip from '../../components/Tooltip';
import { Channel } from '../../types';
import Messages from '../messages/Messages';
import { selectServers } from '../servers/serversSlice';
import User from '../user/User';
import { selectUser } from '../user/userSlice';
import Users from '../users/Users';
import { selectChannel, selectCurrentChannels } from './channelsSlice';

export default function Channels(): JSX.Element {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const { selectedServer } = useAppSelector(selectServers);
    const { user } = useAppSelector(selectUser);
    const currentChannels = useAppSelector(selectCurrentChannels);

    const openChannelSettings = (event: React.MouseEvent, channel: Channel) => {
        event.stopPropagation();

        history.push(`/channel-settings/${channel.id}/channel`);
    };

    return (
        <div className='flex w-full'>
            <div className='bg-main border-r border-main-black w-64 flex flex-col'>
                <ServerName />
                <div className='flex flex-1 overflow-y-auto scrollbar scrollbar-hidden flex-col space-y-2 my-2'>
                    {selectedServer && currentChannels && currentChannels.channels.map((channel, idx) => (
                        <div key={idx} onClick={() => dispatch(selectChannel({ serverId: selectedServer.id, index: idx }))}
                            className={classNames('flex text-white group cursor-pointer font-semibold py-1.5 border-l-2 border-transparent',
                                currentChannels.selectedChannel === idx
                                    ? 'bg-indigo-500 bg-opacity-25 border-l-2 border-indigo-500'
                                    : 'hover:bg-indigo-500 hover:bg-opacity-10 hover:border-l-2 hover:border-indigo-500 hover:border-opacity-50')}
                        >
                            <p className='flex-1 px-4 text-lg select-none' data-testid={`channel-entry-${idx}`}>
                                <span># </span>
                                {channel.name}
                            </p>
                            {user?.id === selectedServer.owner_id && (
                                <Tooltip content='Edit Channel' placement='top' className='flex items-center justify-center'>
                                    <button onClick={(e) => openChannelSettings(e, channel)} className={classNames(currentChannels.selectedChannel === idx ? 'block' : 'hidden', 'mr-2 group-hover:block')}>
                                        <CogIcon className='w-4 h-4' data-testid='channel-edit' />
                                    </button>
                                </Tooltip>
                            )}
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
import { CogIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Tooltip from '../../components/Tooltip';
import { Channel } from '../../types';
import { selectServers } from '../servers/serversSlice';
import { selectUser } from '../user/userSlice';
import { selectChannel, selectCurrentChannels } from './channelsSlice';

export default function ChannelListItem({ channel, idx }: { channel: Channel, idx: number }): JSX.Element {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const { selectedServer } = useAppSelector(selectServers);
    const { user } = useAppSelector(selectUser);
    const currentChannels = useAppSelector(selectCurrentChannels);

    const openChannelSettings = (event: React.MouseEvent, channel: Channel) => {
        event.stopPropagation();

        history.push(`/channel-settings/${channel.id}/channel`);
    };

    const dispatchSelectChannel = () => {
        if (selectedServer === null) {
            return;
        }

        dispatch(selectChannel({ serverId: selectedServer.id, index: idx }));
    };

    return (
        <div key={idx} onClick={dispatchSelectChannel}
            className={classNames('flex text-white group cursor-pointer font-semibold py-1.5 border-l-2 border-transparent',
                currentChannels?.selectedChannel === idx
                    ? 'bg-indigo-500 bg-opacity-25 border-l-2 border-indigo-500'
                    : 'hover:bg-indigo-500 hover:bg-opacity-10 hover:border-l-2 hover:border-indigo-500 hover:border-opacity-50')}
        >
            <p className='flex-1 px-4 text-lg select-none' data-testid={`channel-entry`}>
                <span># </span>
                {channel.name}
            </p>
            {user?.id === selectedServer?.owner_id && (
                <Tooltip content='Edit Channel' placement='top' className='flex items-center justify-center'>
                    <button onClick={(e) => openChannelSettings(e, channel)} className={classNames(currentChannels?.selectedChannel === idx ? 'block' : 'hidden', 'mr-2 group-hover:block')}>
                        <CogIcon className='w-4 h-4' data-testid='channel-edit' />
                    </button>
                </Tooltip>
            )}
        </div>
    );
}
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ServerName from '../../components/ServerName';
import Messages from '../messages/Messages';
import { selectServers } from '../servers/serversSlice';
import User from '../user/User';
import Users from '../users/Users';
import { selectChannel, selectChannels } from './channelsSlice';

export default function Channels(): JSX.Element {
    const dispatch = useAppDispatch();

    const { selectedServer } = useAppSelector(selectServers);
    const { selectedChannel, channels } = useAppSelector(selectChannels);

    useEffect(() => {
        if (selectedServer === null) {
            return;
        }

        if (channels[selectedServer.id]?.length > 0) {
            dispatch(selectChannel(channels[selectedServer.id][0]));
        }
    }, [selectedServer]);

    return (
        <div className='flex w-full'>
            <div className='bg-channels w-64 flex flex-col'>
                <ServerName />
                <div className='flex flex-1 overflow-y-auto scrollbar scrollbar-hidden flex-col space-y-2 ml-2 mr-0.5 my-2'>
                    {selectedServer && channels[selectedServer.id] && channels[selectedServer.id].map((channel, idx) => (
                        <div key={idx} onClick={() => dispatch(selectChannel(channel))}
                            className={classNames('rounded-md cursor-pointer font-semibold px-2 py-1 mr-1 hover:bg-channels-highlight',
                                selectedChannel?.id === channel.id ? 'text-white bg-channels-selected hover:bg-channels-selected' : 'text-channels-text')}>
                            <p className='text-lg select-none'>
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
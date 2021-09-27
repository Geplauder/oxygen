import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ServerName from '../../components/ServerName';
import { selectToken } from '../login/loginSlice';
import Messages from '../messages/Messages';
import { selectServers } from '../servers/serversSlice';
import User from '../user/User';
import { getChannelsAsync, selectChannel, selectChannels } from './channelsSlice';

export default function Channels(): JSX.Element {
    const dispatch = useAppDispatch();

    const { selectedServer } = useAppSelector(selectServers);
    const { selectedChannel, channels } = useAppSelector(selectChannels);

    const token = useAppSelector(selectToken);

    if (token === null) {
        return <Redirect to='/login' />;
    }

    useEffect(() => {
        if (selectedServer === null) {
            return;
        }

        dispatch(getChannelsAsync({ token, serverId: selectedServer.id }))
    }, [selectedServer]);

    return (
        <div className='flex w-full'>
            <div className='bg-channels w-64 flex flex-col'>
                <ServerName />
                <div className='flex flex-grow flex-col space-y-2 mx-2 my-2'>
                    {channels && channels.map((channel, idx) => (
                        <div key={idx} onClick={() => dispatch(selectChannel(channel))}
                            className={classNames('rounded-md cursor-pointer font-semibold px-2 py-1 hover:bg-channels-highlight',
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
        </div>
    );
}
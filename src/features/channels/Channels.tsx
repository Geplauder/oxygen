import { skipToken } from '@reduxjs/toolkit/dist/query';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ServerName from '../../components/ServerName';
import { useGetChannelsQuery } from '../../services/backend';
import { selectToken } from '../login/loginSlice';
import Messages from '../messages/Messages';
import { selectServers } from '../servers/serversSlice';
import User from '../user/User';
import { selectChannel, selectChannels } from './channelsSlice';

export default function Channels(): JSX.Element {
    const dispatch = useAppDispatch();

    const { selectedServer } = useAppSelector(selectServers);
    const { selectedChannel } = useAppSelector(selectChannels);
    const { data: channels } = useGetChannelsQuery(selectedServer?.id ?? skipToken);

    useEffect(() => {
        if (!channels || selectedChannel !== null) {
            return;
        }

        dispatch(selectChannel(channels[0]));
    }, [channels]);

    useEffect(() => {
        if (!channels) {
            return;
        }

        dispatch(selectChannel(channels[0]));
    }, [selectedServer]);

    const token = useAppSelector(selectToken);

    if (token === null) {
        return <Redirect to='/login' />;
    }

    return (
        <div className='flex w-full'>
            <div className='bg-channels w-64 flex flex-col'>
                <ServerName selectedServer={selectedServer} />
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
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import ServerName from '../../components/ServerName';
import Messages from '../messages/Messages';
import User from '../user/User';
import UserList from '../users/UserList';
import ChannelListItem from './ChannelListItem';
import { selectCurrentChannels } from './channelsSlice';

export default function ChannelList(): JSX.Element {
    const currentChannels = useAppSelector(selectCurrentChannels);

    return (
        <div className='flex w-full'>
            <div className='bg-main border-r border-main-black w-64 flex flex-col'>
                <ServerName />
                <div className='flex flex-1 overflow-y-auto scrollbar scrollbar-hidden flex-col space-y-2 my-2'>
                    {currentChannels && currentChannels.channels.map((channel, idx) => (
                        <ChannelListItem channel={channel} idx={idx} key={idx} />
                    ))}
                </div>
                <User />
            </div>
            <Messages />
            <UserList />
        </div>
    );
}
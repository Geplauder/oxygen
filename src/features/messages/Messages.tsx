import React from 'react';
import { Redirect } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import ChannelName from '../../components/ChannelName';
import { useGetMessagesQuery } from '../../services/backend';
import { Channel } from '../../types';
import { selectToken } from '../login/loginSlice';

export default function Messages({ selectedChannel }: { selectedChannel: Channel }): JSX.Element {
    const token = useAppSelector(selectToken);

    const { data } = useGetMessagesQuery(selectedChannel.id);

    if (token === null) {
        return <Redirect to='/login' />;
    }

    return (
        <div className='flex bg-messages flex-col flex-grow h-screen'>
            <ChannelName selectedChannel={selectedChannel} />
            <div className='flex-grow'>
                {data && data.map((message, idx) => (
                    <div key={idx} className='flex space-x-4 px-4 py-2'>
                        <div>
                            <div className='w-12 h-12 bg-red-500 rounded-full'></div>
                        </div>
                        <div className='text-white'>
                            <p className='font-semibold'>
                                {message.user.username} <span className='font-thin text-[8pt] text-gray-300'>({message.created_at})</span>
                            </p>
                            <p>
                                {message.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
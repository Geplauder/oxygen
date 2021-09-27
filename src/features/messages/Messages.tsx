import React from 'react';
import { Redirect } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import ChannelName from '../../components/ChannelName';
import MessageBox from '../../components/MessageBox';
import { selectChannels } from '../channels/channelsSlice';
import { selectToken } from '../login/loginSlice';
import { selectMessages } from './messagesSlice';
import moment from 'moment';

export default function Messages(): JSX.Element {
    const { selectedChannel } = useAppSelector(selectChannels);
    const { messages } = useAppSelector(selectMessages);

    const token = useAppSelector(selectToken);

    if (token === null) {
        return <Redirect to='/login' />;
    }

    return (
        <div className='flex bg-messages flex-col flex-grow h-screen'>
            <ChannelName selectedChannel={selectedChannel} />
            <div className='flex-grow overflow-y-scroll'>
                {selectedChannel && messages[selectedChannel.id] && messages[selectedChannel.id].map((message, idx) => (
                    <div key={idx} className='flex space-x-4 px-4 py-2'>
                        <div>
                            <div className='w-12 h-12 bg-red-500 rounded-full'></div>
                        </div>
                        <div className='text-white'>
                            <p className='font-semibold'>
                                {message.user.username} <span className='ml-1 font-normal text-[8pt] text-gray-300'>{moment(message.created_at).calendar()}</span>
                            </p>
                            <p>
                                {message.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedChannel && (
                <MessageBox token={token} selectedChannel={selectedChannel} />
            )}
        </div>
    );
}
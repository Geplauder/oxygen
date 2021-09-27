import React from 'react';
import { Redirect } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import ChannelName from '../../components/ChannelName';
import MessageBox from '../../components/MessageBox';
import { selectChannels } from '../channels/channelsSlice';
import { selectToken } from '../login/loginSlice';
import { selectMessages } from './messagesSlice';
import Message from './Message';

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
            <div className='flex-1 overflow-y-auto space-y-2 pb-2 scrollbar mr-1'>
                {selectedChannel && messages[selectedChannel.id] && messages[selectedChannel.id].map((message, idx) => (
                    <Message key={idx} message={message} />
                ))}
            </div>
            {selectedChannel && (
                <MessageBox token={token} selectedChannel={selectedChannel} />
            )}
        </div>
    );
}
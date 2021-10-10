import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ChannelName from '../../components/ChannelName';
import MessageBox from '../../components/MessageBox';
import { selectCurrentChannels, selectSelectedChannel } from '../channels/channelsSlice';
import { getMessagesAsync, selectMessages } from './messagesSlice';
import Message from './Message';

export default function Messages(): JSX.Element {
    const dispatch = useAppDispatch();

    const currentChannels = useAppSelector(selectCurrentChannels);
    const selectedChannel = useAppSelector(selectSelectedChannel);
    const { messages } = useAppSelector(selectMessages);

    const messagesEnd = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (selectedChannel && messages[selectedChannel.id] == null) {
            dispatch(getMessagesAsync({ channelId: selectedChannel.id }));
        }

        if (messagesEnd.current !== null) {
            messagesEnd.current.scrollIntoView();
        }
    }, [messages, currentChannels]);

    return (
        <div className='flex bg-main-dark flex-col flex-grow h-screen'>
            <ChannelName selectedChannel={selectedChannel} />
            <div className='flex-1 overflow-y-auto space-y-2 pb-2 scrollbar'>
                {selectedChannel && messages[selectedChannel.id] && messages[selectedChannel.id].map((message, idx) => (
                    <Message key={idx} message={message} />
                ))}
                <div ref={messagesEnd} className='float-left clear-both'></div>
            </div>
            {selectedChannel && (
                <MessageBox selectedChannel={selectedChannel} />
            )}
        </div>
    );
}
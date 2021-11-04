import React, { KeyboardEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { startTyping } from '../features/channels/channelsSlice';
import { postMessageAsync } from '../features/messages/messagesSlice';
import { selectTypingUsers } from '../features/typingUsers/typingUsersSlice';
import { Channel } from '../types';

export default function MessageBox({ selectedChannel }: { selectedChannel: Channel }): JSX.Element {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState('');
    const [lastSent, setLastSent] = useState(0);

    const typingUsers = useAppSelector(selectTypingUsers)[selectedChannel.id] ?? [];


    const sendMessage = async (event: KeyboardEvent) => {
        if (event.key !== 'Enter' || message.trim().length === 0) {
            return;
        }

        dispatch(postMessageAsync({ channelId: selectedChannel.id, content: message }));

        setMessage('');
    }

    const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);

        const now = Date.now();
        if (now - lastSent > 3000) {
            dispatch(startTyping(selectedChannel.id));
            setLastSent(now);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className='px-4 w-full'>
                <input type="text"
                    className='w-full h-12 rounded-lg bg-[#121418] text-white border-none placeholder-[#909399] focus:ring-2 focus:ring-indigo-500'
                    placeholder={'Message #' + selectedChannel.name}
                    value={message}
                    onChange={onMessageChange}
                    onKeyDown={sendMessage}
                />
            </div>
            <span className='w-full text-left text-white text-sm mt-0.5 px-4 h-6' data-testid='users-typing'>
                {typingUsers.length > 0 && (
                    <>
                        {typingUsers.map<React.ReactNode>((x, idx) => <span key={idx} className='font-bold'>{x.username}</span>).reduce((prev, curr) => [prev, ', ', curr])}
                        {typingUsers.length === 1 ? ' is' : ' are'} typing...
                    </>
                )}
            </span>
        </div>
    );
}
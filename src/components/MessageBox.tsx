import React, { KeyboardEvent, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { postMessageAsync } from '../features/messages/messagesSlice';
import { Channel } from '../types';

export default function MessageBox({ selectedChannel }: { selectedChannel: Channel }): JSX.Element {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState('');

    const sendMessage = async (event: KeyboardEvent) => {
        if (event.key !== 'Enter' || message.length === 0) {
            return;
        }

        dispatch(postMessageAsync({ channelId: selectedChannel.id, content: message }));

        setMessage('');
    }

    return (
        <div className="mb-4 flex items-center">
            <div className='mx-4 w-full'>
                <input type="text"
                    className='w-full h-12 rounded-lg bg-textbox text-white border-none focus:ring-transparent placeholder-[#909399]'
                    placeholder={'Message #' + selectedChannel.name}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={sendMessage}
                />
            </div>
        </div>
    );
}
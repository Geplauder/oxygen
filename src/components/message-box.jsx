import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAxios } from '../utility/api';

const MessageBox = ({ selectedChannel, setUpdateMessages }) => {
    const bearerToken = useSelector(state => state.auth.bearerToken);

    const [message, setMessage] = useState('');

    const sendMessage = async (e) => {
        if (e.key !== 'Enter' || message.length === 0) {
            return;
        }

        const axios = getAxios(bearerToken);

        axios.post(`channels/${selectedChannel.id}/messages`, {
            content: message,
        })
            .then(_ => {
                setUpdateMessages(x => !x);
            });

        setMessage('');
    };

    return (
        <div className="h-20 flex items-center">
            <div className='mx-4 w-full'>
                <input type="text" className='w-full rounded-lg bg-textbox text-white border-none focus:ring-transparent placeholder-[#909399]' placeholder={'Message #' + selectedChannel?.name} value={message} onChange={e => setMessage(e.target.value)} onKeyDown={sendMessage} />
            </div>
        </div>
    )
};

export default MessageBox;
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAxios } from '../utility/api';
import PropTypes from 'prop-types';

const Messages = ({ selectedChannel, updateMessages }) => {
    const bearerToken = useSelector(state => state.auth.bearerToken);

    const [messages, setMessages] = useState(null);

    useEffect(() => {
        setMessages(null);

        if (selectedChannel === null) {
            return;
        }

        const axios = getAxios(bearerToken);

        axios.get(`channels/${selectedChannel.id}/messages`)
            .then(x => setMessages(x.data));
    }, [selectedChannel, updateMessages]);

    return (
        <div className='flex-grow'>
            {messages && messages.map((message, idx) => (
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
    );
};

Messages.propTypes = {
    selectedChannel: PropTypes.object,
    updateMessages: PropTypes.bool
};

export default Messages;
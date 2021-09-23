import React from 'react';
import MessageLoader from '../contentLoaders/message-loader';

const Messages = ({ messages }) => {
    if (messages === null) {
        return (<div className='mx-4 my-2 overflow-y-scroll'>
            {Array(10).fill().map(_ => <MessageLoader />)}
        </div>);
    };

    return (
        <div className='flex-grow'>
            {messages.map((message, idx) => (
                <div key={idx} className='flex space-x-4 px-4 py-2'>
                    <div>
                        <div className='w-12 h-12 bg-red-500 rounded-full'></div>
                    </div>
                    <div>
                        <p className='text-white'>
                            {message.user.username} <span className='font-thin text-xs text-gray-200'>({message.created_at})</span>
                        </p>
                        <p>
                            {message.content}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Messages;
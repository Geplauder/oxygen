import React from 'react';
import moment from 'moment';
import { Message as MessageObject } from '../../types';

export default function Message({ message }: { message: MessageObject }): JSX.Element {
    return (
        <div className='flex space-x-4 px-4 py-2 mr-12 hover:bg-messages-highlight'>
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
    );
}
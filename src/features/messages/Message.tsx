import React from 'react';
import moment from 'moment';
import { Message as MessageObject } from '../../types';
import UserAvatar from '../user/UserAvatar';

export default function Message({ message }: { message: MessageObject }): JSX.Element {
    return (
        <div className='flex space-x-4 px-4 py-2 mr-1 hover:bg-messages-highlight'>
            <div>
                <UserAvatar user={message.user} size='normal' />
            </div>
            <div className='text-white'>
                <p className='font-semibold'>
                    {message.user.username} <span className='ml-1 font-normal text-[8pt] text-gray-300 cursor-default'>{moment(message.created_at).calendar()}</span>
                </p>
                <p>
                    {message.content}
                </p>
            </div>
        </div>
    );
}
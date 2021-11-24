import React from 'react';
import moment from 'moment';
import { Message as MessageObject } from '../../types';
import UserAvatar from '../user/UserAvatar';
import UserPopover from '../users/UserPopover';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

export default function Message({ message }: { message: MessageObject }): JSX.Element {
    return (
        <div className='flex space-x-4 px-4 py-2 hover:bg-indigo-500 hover:bg-opacity-10 border-l-2 border-transparent hover:border-indigo-500 hover:border-opacity-50'>
            <div>
                <UserPopover user={message.user}>
                    <UserAvatar user={message.user} size='normal' />
                </UserPopover>
            </div>
            <div className='text-white'>
                <div className='inline-flex items-center'>
                    <UserPopover user={message.user}>
                        <span className='font-semibold hover:underline'>{message.user.username}</span>
                    </UserPopover>
                    <span className='ml-2 mt-1 font-normal text-[8pt] text-gray-300 cursor-default'>{moment(message.created_at).calendar()}</span>
                </div>
                <div className='break-anywhere'>
                    <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                        {message.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
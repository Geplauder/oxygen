import { StarIcon } from '@heroicons/react/solid';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { User } from '../../types';
import { selectServers } from '../servers/serversSlice';
import UserAvatar from '../user/UserAvatar';

export default function UserListItem({ user }: { user: User }): JSX.Element {
    const { selectedServer } = useAppSelector(selectServers);

    return (
        <div className='my-2 py-1 hover:bg-indigo-500 hover:bg-opacity-10 border-l-2 border-transparent hover:border-indigo-500 hover:border-opacity-50'>
            <div className='flex items-center space-x-4 px-4'>
                <div>
                    <UserAvatar user={user} size='small' />
                </div>
                <div className="flex space-x-1.5 items-center text-white font-semibold text-lg select-none truncate">
                    <p className='truncate'>{user.username}</p>
                    {selectedServer?.owner_id === user.id && (
                        <StarIcon className='flex-shrink-0 text-yellow-400 w-4 h-4 mt-1' />
                    )}
                </div>
            </div>
        </div>
    );
}
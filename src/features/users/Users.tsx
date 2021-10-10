import { StarIcon } from '@heroicons/react/solid';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectServers } from '../servers/serversSlice';
import UserAvatar from '../user/UserAvatar';
import { selectUsers } from './usersSlice';

export default function Users(): JSX.Element {

    const { selectedServer } = useAppSelector(selectServers);
    const { users } = useAppSelector(selectUsers);

    return (
        <div className='flex bg-main border-l border-main-black w-64'>
            <div className='flex-1 overflow-y-scroll scrollbar scrollbar-hidden mr-0.5'>
                {selectedServer && users[selectedServer.id] && users[selectedServer.id].map((user, idx) => (
                    <div key={idx} className='my-2 py-1 hover:bg-main-accent hover:bg-opacity-10 border-l-2 border-transparent hover:border-main-accent hover:border-opacity-50'>
                        <div className='flex items-center space-x-4 px-4'>
                            <div>
                                <UserAvatar user={user} size='small' />
                            </div>
                            <div className="flex space-x-1.5 items-center text-white font-semibold text-lg select-none truncate">
                                <p className='truncate'>{user.username}</p>
                                {selectedServer.owner_id === user.id && (
                                    <StarIcon className='flex-shrink-0 text-yellow-400 w-4 h-4 mt-1' />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
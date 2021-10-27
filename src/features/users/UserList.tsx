import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectServers } from '../servers/serversSlice';
import UserListItem from './UserListItem';
import { selectUsers } from './usersSlice';

export default function UserList(): JSX.Element {
    const { selectedServer } = useAppSelector(selectServers);
    const { users } = useAppSelector(selectUsers);

    return (
        <div className='flex bg-main border-l border-main-black w-64'>
            <div className='flex-1 overflow-y-scroll scrollbar scrollbar-hidden mr-0.5'>
                {selectedServer && users[selectedServer.id] && users[selectedServer.id].map((user, idx) => (
                    <UserListItem user={user} key={idx} />
                ))}
            </div>
        </div>
    );
}
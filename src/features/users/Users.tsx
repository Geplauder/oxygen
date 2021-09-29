import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUsers } from './usersSlice';

export default function Users(): JSX.Element {
    const { users } = useAppSelector(selectUsers);

    return (
        <div className='flex bg-userlist w-64'>
            <div className='flex-1 overflow-y-scroll scrollbar scrollbar-hidden mr-0.5'>
                {users.map((user, idx) => (
                    <div key={idx} className='flex items-center space-x-4 mx-2 px-2 my-2 py-1 rounded-md hover:bg-userlist-highlight'>
                        <div>
                            <div className='w-10 h-10 bg-red-500 rounded-full'></div>
                        </div>
                        <div className="text-white font-semibold text-lg select-none">
                            <p>{user.username}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import UserAvatar from './UserAvatar';
import { selectUser } from './userSlice';

export default function User(): JSX.Element {
    const { user } = useAppSelector(selectUser);

    return (
        <>
            {user && (
                <div className="h-12 bg-userinfo flex space-x-2 items-center">
                    <UserAvatar className='ml-2' user={user} size='small' />
                    <p className='text-white text-lg font-semibold select-none'>
                        {user?.username}
                    </p>
                </div>
            )}
        </>
    );
}
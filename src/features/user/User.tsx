import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from './userSlice';

export default function User(): JSX.Element {
    const user = useAppSelector(selectUser);

    return (
        <div className="h-12 bg-userinfo flex items-center">
            <p className='mx-4 text-white text-lg font-semibold select-none'>
                {user?.username}
            </p>
        </div>
    );
}
import { CogIcon } from '@heroicons/react/solid';
import React from 'react';
import { useHistory } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import Tooltip from '../../components/Tooltip';
import UserAvatar from './UserAvatar';
import { selectUser } from './userSlice';

export default function User(): JSX.Element {
    const history = useHistory();

    const { user } = useAppSelector(selectUser);

    const openSettings = () => {
        history.push('/settings/user');
    };

    return (
        <>
            {user && (
                <div className="h-16 bg-main border-t border-main-black flex items-center px-3">
                    <UserAvatar className='' user={user} size='small' />
                    <p className='ml-2 flex-1 text-white text-lg font-semibold select-none truncate'>
                        {user?.username}
                    </p>
                    <Tooltip placement="top" content="Settings">
                        <button
                            type="button"
                            className="inline-flex items-center p-2 mr-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white transition-colors hover:bg-indigo-500 hover:bg-opacity-25"
                            onClick={openSettings}
                        >
                            <CogIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </Tooltip>
                </div>
            )}
        </>
    );
}

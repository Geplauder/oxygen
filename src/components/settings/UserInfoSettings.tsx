import React from 'react';
import { useAppSelector } from '../../app/hooks';
import UserAvatar from '../../features/user/UserAvatar';
import { selectUser } from '../../features/user/userSlice';
import { DangerButton, PrimaryButton } from '../buttons/Buttons';
import { UpdateUserField } from './UpdateField';

export default function UserInfoSettings(): JSX.Element {
    const { user } = useAppSelector(selectUser);

    if (user === null) {
        return <div />;
    }

    return (
        <div className="mt-6">
            <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-100">Username</dt>
                    <dd className="mt-1 flex text-sm text-white sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">{user.username}</span>
                        <span className="ml-4 flex-shrink-0">
                            <UpdateUserField field='name' displayField='Username' inputType='text' />
                        </span>
                    </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                    <dt className="text-sm font-medium text-gray-100">Photo</dt>
                    <dd className="mt-1 flex text-sm text-white sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">
                            <UserAvatar user={user} size='small' />
                        </span>
                        <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                            <DangerButton>
                                Remove
                            </DangerButton>
                            <PrimaryButton>
                                Update
                            </PrimaryButton>
                        </span>
                    </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                    <dt className="text-sm font-medium text-gray-100">Email</dt>
                    <dd className="mt-1 flex text-sm text-white sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">***</span>
                        <span className="ml-4 flex-shrink-0">
                            <UpdateUserField field='email' displayField='Email' inputType='email' />
                        </span>
                    </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                    <dt className="text-sm font-medium text-gray-100">Password</dt>
                    <dd className="mt-1 flex text-sm text-white sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">***</span>
                        <span className="ml-4 flex-shrink-0">
                            <UpdateUserField field='password' displayField='Password' inputType='password' requireValueConfirmation={true} />
                        </span>
                    </dd>
                </div>
            </dl>
        </div>
    );
}
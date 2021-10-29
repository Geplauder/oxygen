import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XIcon } from '@heroicons/react/solid';
import React, { Fragment, useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { fetchServerInvites } from '../../features/serverInvites/serverInvitesAPI';
import { selectServers } from '../../features/servers/serversSlice';
import { ServerInvite } from '../../types';
import { DangerButton } from '../buttons/Buttons';

export default function ServerInviteSettings(): JSX.Element {
    const { selectedServer } = useAppSelector(selectServers);

    const [invites, setInvites] = useState<ServerInvite[]>([]);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (selectedServer === null || invites.length > 0) {
            return;
        }

        fetchServerInvites(selectedServer.id)
            .then(x => setInvites(x.data));
    }, [selectedServer]);

    if (selectedServer === null) {
        return <div />;
    }

    const handleInviteCodeClick = async (invite: ServerInvite) => {
        await navigator.clipboard.writeText(invite.code);

        setShowToast(true);

        setTimeout(() => setShowToast(false), 1000 * 3);
    };

    return (
        <>
            <div className="mt-6">
                <div className="bg-main-black shadow-lg overflow-hidden sm:rounded-md">
                    <ul role="list" className="divide-y divide-main">
                        {invites.map((invite) => (
                            <li key={invite.id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <button className="text-sm font-medium text-indigo-500 truncate" onClick={() => handleInviteCodeClick(invite)}>{invite.code}</button>
                                    </div>
                                    <div className="mt-2 text-white sm:flex sm:justify-between">
                                        <div className="sm:flex space-x-6">
                                            <p className="flex items-center text-sm">
                                                From: Server
                                            </p>
                                            <p className="mt-2 flex items-center text-sm sm:mt-0">
                                                Uses: Unlimited
                                            </p>
                                            <p className="mt-2 flex items-center text-sm sm:mt-0">
                                                Expires: never
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm sm:mt-0">
                                            <DangerButton>Delete</DangerButton>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div
                aria-live="assertive"
                className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    <Transition
                        show={showToast}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">Copied server invite code to clipboard!</p>
                                    </div>
                                    <div className="ml-4 flex-shrink-0 flex">
                                        <button
                                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => {
                                                setShowToast(false)
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    );
}
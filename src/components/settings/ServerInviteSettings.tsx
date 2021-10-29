import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { fetchServerInvites } from '../../features/serverInvites/serverInvitesAPI';
import { selectServers } from '../../features/servers/serversSlice';
import { ServerInvite } from '../../types';
import { DangerButton } from '../buttons/Buttons';

export default function ServerInviteSettings(): JSX.Element {
    const { selectedServer } = useAppSelector(selectServers);

    const [invites, setInvites] = useState<ServerInvite[]>([]);

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

    return (
        <div className="mt-6">
            <div className="bg-main-black shadow-lg overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-main">
                    {invites.map((invite) => (
                        <li key={invite.id}>
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-indigo-500 truncate">{invite.code}</p>
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
    );
}
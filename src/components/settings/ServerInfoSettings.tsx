import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectServers } from '../../features/servers/serversSlice';
import UpdateServerField from './UpdateServerField';

export default function ServerInfoSettings(): JSX.Element {
    const { selectedServer } = useAppSelector(selectServers);

    if (selectedServer === null) {
        return <div />;
    }

    return (
        <div className="mt-6">
            <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-100">Name</dt>
                    <dd className="mt-1 flex text-sm text-white sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">{selectedServer.name}</span>
                        <span className="ml-4 flex-shrink-0">
                            <UpdateServerField serverId={selectedServer.id} field='name' displayField='Name' inputType='text' />
                        </span>
                    </dd>
                </div>
            </dl>
        </div>
    );
}
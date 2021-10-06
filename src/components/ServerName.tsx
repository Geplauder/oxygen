import React, { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import CreateChannel from '../features/channels/CreateChannel';
import { selectServers } from '../features/servers/serversSlice';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import {
    PlusIcon,
    TrashIcon,
} from '@heroicons/react/solid'

export default function ServerName(): JSX.Element {
    const { selectedServer } = useAppSelector(selectServers);

    const [openCreateChannel, setOpenCreateChannel] = useState(false);

    return (
        <div className="flex items-center h-12 border-b border-gray-800">
            <p className='flex-1 mx-4 text-white text-xl font-semibold select-none'>{selectedServer?.name}</p>
            <Dropdown>
                <div className='py-1'>
                    <DropdownItem onClick={(e) => { e.preventDefault(); setOpenCreateChannel(true); }} icon={PlusIcon}>
                        Create Channel
                    </DropdownItem>
                    <DropdownItem onClick={(e) => { }} icon={TrashIcon}>
                        Delete Server
                    </DropdownItem>
                </div>
            </Dropdown>
            <CreateChannel open={openCreateChannel} setOpen={setOpenCreateChannel} selectedServer={selectedServer} />
        </div>
    );
}
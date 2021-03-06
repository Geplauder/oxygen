import React, { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import CreateChannel from '../features/channels/CreateChannel';
import { selectServers } from '../features/servers/serversSlice';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import {
    ArrowCircleLeftIcon,
    BadgeCheckIcon,
    CogIcon,
    PlusIcon,
} from '@heroicons/react/solid'
import LeaveServer from '../features/servers/LeaveServer';
import { selectUser } from '../features/user/userSlice';
import { useHistory } from 'react-router';
import { ServerFlags } from '../types';
import Tooltip from './Tooltip';

export default function ServerName(): JSX.Element {
    const history = useHistory();

    const { user } = useAppSelector(selectUser);
    const { selectedServer } = useAppSelector(selectServers);

    const [openCreateChannel, setOpenCreateChannel] = useState(false);
    const [openLeaveServer, setOpenLeaveServer] = useState(false);

    const openServerSettings = () => {
        history.push('/server-settings/server');
    };

    if (selectedServer === null) {
        return <div />;
    }

    return (
        <div className="flex items-center h-12">
            <p className='flex flex-1 mx-4 items-center text-white text-xl font-semibold select-none truncate'>
                {(selectedServer.flags & ServerFlags.Verified) > 0 && (
                    <Tooltip content='Verified' placement='bottom'>
                        <BadgeCheckIcon className='w-5 h-5 mr-1.5 mt-0.5' />
                    </Tooltip>
                )}
                {selectedServer.name}
            </p>
            <Dropdown>
                {selectedServer.owner_id === user?.id ? (
                    <>
                        <div className='py-1'>
                            <DropdownItem onClick={() => setOpenCreateChannel(true)} icon={PlusIcon}>
                                Create Channel
                            </DropdownItem>
                        </div>
                        <div className='py-1'>
                            <DropdownItem onClick={openServerSettings} icon={CogIcon}>
                                Server Settings
                            </DropdownItem>
                        </div>
                    </>
                ) : (
                    <div className="py-1">
                        <DropdownItem onClick={() => setOpenLeaveServer(true)} icon={ArrowCircleLeftIcon} danger={true}>
                            Leave Server
                        </DropdownItem>
                    </div>
                )}
            </Dropdown>
            <CreateChannel open={openCreateChannel} setOpen={setOpenCreateChannel} selectedServer={selectedServer} />
            <LeaveServer open={openLeaveServer} setOpen={setOpenLeaveServer} />
        </div>
    );
}
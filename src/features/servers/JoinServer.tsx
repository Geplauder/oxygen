import React, { useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useAppDispatch } from '../../app/hooks';
import { putJoinServerAsync } from './serversSlice';
import { ActionModal } from '../../components/Modal';

export default function JoinServer({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {
    const dispatch = useAppDispatch();

    const [serverId, setServerId] = useState('Server Id');
    const cancelButtonRef = useRef(null);

    const joinServer = () => {
        dispatch(putJoinServerAsync({ serverId }));
        setOpen(false);
    };

    const handleSubmit = (event: React.KeyboardEvent) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        joinServer();
    };

    return (
        <ActionModal open={open} setOpen={setOpen} initialFocus={cancelButtonRef} actionName='Join' onAction={joinServer}>
            <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white">
                        Create Server
                    </Dialog.Title>
                    <div className="mt-2">
                        <div>
                            <label htmlFor="server-id" className="block text-sm font-medium text-gray-100">
                                Server Id
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="server-id"
                                    id="server-id"
                                    className="bg-main-dark text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-main-black rounded-md"
                                    value={serverId}
                                    onChange={e => setServerId(e.target.value)}
                                    onKeyDown={(e) => handleSubmit(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ActionModal>
    )
}
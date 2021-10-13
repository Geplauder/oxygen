import { Dialog } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import React, { useRef } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { ActionModal } from '../../components/Modal';
import { Server } from '../../types';
import { deleteServerAsync } from './serversSlice';

export default function DeleteServer({ selectedServer, open, setOpen }: { selectedServer: Server | null, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {
    const dispatch = useAppDispatch();

    const cancelButtonRef = useRef(null);

    if (selectedServer === null) {
        return <div />;
    }

    const deleteServer = () => {
        dispatch(deleteServerAsync({ serverId: selectedServer.id }));
        setOpen(false);
    };

    return (
        <ActionModal open={open} setOpen={setOpen} initialFocus={cancelButtonRef} actionName='Delete' onAction={deleteServer}>
            <div className="px-4 pt-5 pb-4 sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-500 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-100" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white">
                        Delete Server
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-100">
                            Are you sure you want to delete this server? All of your data will be permanently removed
                            from our servers forever. This action cannot be undone.
                        </p>
                    </div>
                </div>
            </div>
        </ActionModal>
    );
}
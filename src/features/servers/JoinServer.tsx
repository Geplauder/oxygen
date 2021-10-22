import React, { useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useAppDispatch } from '../../app/hooks';
import { putJoinServerAsync } from './serversSlice';
import { ActionModal } from '../../components/Modal';
import ErrorBox from '../../components/ErrorBox';
import { ErrorResponse } from '../../types';

export default function JoinServer({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [serverId, setServerId] = useState('Server Id');
    const cancelButtonRef = useRef(null);

    const joinServer = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (serverId.trim().length === 0) {
                setError('Please fill out all fields.');

                return;
            }

            const status = await dispatch(putJoinServerAsync({ serverId }));

            if (status.type === putJoinServerAsync.rejected.type) {
                const errorResponse = status.payload as ErrorResponse;

                switch (errorResponse.status) {
                    case 400: {
                        setError(errorResponse.data);

                        return;
                    }
                    case 404: {
                        setError('We could not find a server with that id.');

                        return;
                    }
                    case 500: {
                        setError('Whoops, something went wrong. Please try again later.');

                        return;
                    }
                }
            }

            setOpen(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (event: React.KeyboardEvent) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        await joinServer();
    };

    return (
        <ActionModal open={open} setOpen={setOpen} initialFocus={cancelButtonRef} actionName='Join' onAction={joinServer} isLoading={isLoading}>
            <ErrorBox className='mb-4' error={error} />
            <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white">
                        Join Server
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
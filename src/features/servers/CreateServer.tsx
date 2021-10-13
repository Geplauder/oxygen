import React, { useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useAppDispatch } from '../../app/hooks';
import { postServerAsync } from './serversSlice';
import { ActionModal } from '../../components/Modal';
import ErrorBox from '../../components/ErrorBox';
import { ErrorResponse } from '../../types';

export default function CreateServer({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [serverName, setServerName] = useState('New Server');
    const cancelButtonRef = useRef(null);

    const createServer = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (serverName.trim().length === 0) {
                setError('Please fill out all fields.');

                return;
            }

            const status = await dispatch(postServerAsync({ name: serverName }));

            if (status.type === postServerAsync.rejected.type) {
                const errorResponse = status.payload as ErrorResponse;

                switch (errorResponse.status) {
                    case 400: {
                        setError(errorResponse.data);

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

        await createServer();
    };

    return (
        <ActionModal open={open} setOpen={setOpen} initialFocus={cancelButtonRef} actionName='Create' onAction={createServer} isLoading={isLoading}>
            <ErrorBox className='mb-4' error={error} />
            <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white">
                        Create Server
                    </Dialog.Title>
                    <div className="mt-2">
                        <div>
                            <label htmlFor="server-name" className="block text-sm font-medium text-gray-100">
                                Server Name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="server-name"
                                    id="server-name"
                                    className="bg-main-dark text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-main-black rounded-md"
                                    value={serverName}
                                    onChange={e => setServerName(e.target.value)}
                                    onKeyDown={(e) => handleSubmit(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ActionModal>
    );
}
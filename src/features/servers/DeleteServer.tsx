import { Dialog } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { TrashIcon } from '@heroicons/react/solid';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ErrorBox from '../../components/ErrorBox';
import { ActionModal } from '../../components/Modal';
import { ErrorResponse } from '../../types';
import { deleteServerAsync, selectServers } from './serversSlice';

export default function DeleteServer(): JSX.Element {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const { selectedServer } = useAppSelector(selectServers);

    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const cancelButtonRef = useRef(null);

    if (selectedServer === null) {
        return <div />;
    }

    const deleteServer = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const status = await dispatch(deleteServerAsync({ serverId: selectedServer.id }));

            if (status.type === deleteServerAsync.rejected.type) {
                const errorResponse = status.payload as ErrorResponse;

                switch (errorResponse.status) {
                    case 403: {
                        setError('You do not have permission to delete this server.');

                        return;
                    }
                    case 500: {
                        setError('Whoops, something went wrong. Please try again later.');

                        return;
                    }
                }
            }

            setOpen(false);
            history.push('/');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                className="group w-full border-transparent border-l-2 py-2 px-3 flex items-center text-sm font-medium text-red-500 hover:bg-indigo-500 hover:bg-opacity-10 hover:border-l-2 hover:border-indigo-500 hover:border-opacity-50"
                onClick={() => setOpen(true)}
            >
                <TrashIcon className="mr-3 h-6 w-6" aria-hidden="true" />
                Delete Server
            </button>
            <ActionModal open={open} setOpen={setOpen} initialFocus={cancelButtonRef} actionName='Delete' onAction={deleteServer} isLoading={isLoading}>
                <ErrorBox error={error} />
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
        </>
    );
}
import { Dialog } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ErrorBox from '../../components/ErrorBox';
import { ActionModal } from '../../components/Modal';
import { ErrorResponse } from '../../types';
import { deleteLeaveServerAsync, selectServers } from './serversSlice';

export default function LeaveServer({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {
    const dispatch = useAppDispatch();

    const { selectedServer } = useAppSelector(selectServers);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const cancelButtonRef = useRef(null);

    if (selectedServer === null) {
        return <div />;
    }

    const leaveServer = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const status = await dispatch(deleteLeaveServerAsync({ serverId: selectedServer.id }));

            if (status.type === deleteLeaveServerAsync.rejected.type) {
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

    return (
        <ActionModal open={open} setOpen={setOpen} initialFocus={cancelButtonRef} actionName='Leave' onAction={leaveServer} isLoading={isLoading}>
            <ErrorBox error={error} />
            <div className="px-4 pt-5 pb-4 sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-500 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-100" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white">
                        Leave Server
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-100">
                            Are you sure you want to leave this server?
                        </p>
                    </div>
                </div>
            </div>
        </ActionModal>
    );
}
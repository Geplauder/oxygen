import { Dialog } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import ErrorBox from '../../components/ErrorBox';
import { ActionModal } from '../../components/Modal';
import { Channel, ErrorResponse } from '../../types';
import { deleteChannelAsync } from './channelsSlice';

export default function DeleteServer({ channel, open, setOpen }: { channel: Channel, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const cancelButtonRef = useRef(null);

    const deleteChannel = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const status = await dispatch(deleteChannelAsync({ channelId: channel.id }));

            if (status.type === deleteChannelAsync.rejected.type) {
                const errorResponse = status.payload as ErrorResponse;

                switch (errorResponse.status) {
                    case 403: {
                        setError('You do not have permission to delete this channel.');

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
            <span>Delete Channel</span>
            <ActionModal open={open} setOpen={setOpen} initialFocus={cancelButtonRef} actionName='Delete' onAction={deleteChannel} isLoading={isLoading}>
                <ErrorBox error={error} />
                <div className="px-4 pt-5 pb-4 sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-500 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationIcon className="h-6 w-6 text-red-100" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white">
                            Delete Channel
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-100">
                                Are you sure you want to delete this channel? All of your data will be permanently removed
                                from our servers forever. This action cannot be undone.
                            </p>
                        </div>
                    </div>
                </div>
            </ActionModal>
        </>
    );
}
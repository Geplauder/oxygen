import { Transition } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/user/userSlice';

export default function ConnectionState(): JSX.Element {
    const { isWebsocketClosed } = useAppSelector(selectUser);

    return (
        <div
            aria-live="assertive"
            className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
        >
            <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                <Transition
                    show={isWebsocketClosed}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <ExclamationCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-gray-900">Oh no 😨</p>
                                    <p className="mt-1 text-sm text-gray-500">You've lost connection to the WebSocket server. As we're currently not supporting reconnections, you should probably refresh the site.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    );
}
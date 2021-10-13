import { Dialog, Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/solid';
import React, { Fragment, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { postUpdateUserAsync } from '../../features/user/userSlice';
import { PrimaryButton, SecondaryButton } from '../buttons/Buttons';

export default function UpateUserField({ field, displayField, inputType, requireConfirmation = false }: { field: string, displayField: string, inputType: React.HTMLInputTypeAttribute, requireConfirmation?: boolean }): JSX.Element {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [confirmValue, setConfirmValue] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const valueRef = useRef(null);

    const updateValue = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (value.trim().length === 0 || currentPassword.trim().length === 0 || (requireConfirmation && confirmValue.trim().length === 0)) {
                setError('Please fill out all fields.');

                return;
            }

            const status = await dispatch(postUpdateUserAsync({ [field]: value, currentPassword }));

            if (status.type === postUpdateUserAsync.rejected.type) {
                switch ((status.payload as any).status) {
                    case 400: {
                        setError(`Please enter a valid ${field}.`);
                        break;
                    }
                    case 403: {
                        setError('The current password you entered is wrong.');
                        break;
                    }
                    case 500: {
                        setError('Whoops, something went wrong. Please try again later.');
                        break;
                    }
                }
            } else {
                setValue('');
                setConfirmValue('');
                setCurrentPassword('');

                setOpen(false);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (event: React.KeyboardEvent) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        await updateValue();
    };

    return (
        <>
            <PrimaryButton onClick={() => setOpen(true)}>
                Update
            </PrimaryButton>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={valueRef} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-main rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            {error && (
                                                <div className="rounded-md bg-red-50 p-4 mb-4">
                                                    <div className="flex">
                                                        <div className="flex-shrink-0">
                                                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white">
                                                Update {displayField}
                                            </Dialog.Title>
                                            <div className="flex flex-col space-y-4 mt-6">
                                                <div>
                                                    <label htmlFor="new-value" className="block text-sm font-medium text-gray-100">
                                                        New {displayField}
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type={inputType}
                                                            name="new-value"
                                                            id="new-value"
                                                            className="bg-main-dark text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-main-black rounded-md"
                                                            value={value}
                                                            onChange={e => setValue(e.target.value)}
                                                            ref={valueRef}
                                                        />
                                                    </div>
                                                </div>
                                                {requireConfirmation && (
                                                    <div>
                                                        <label htmlFor="confirm-new-value" className="block text-sm font-medium text-gray-100">
                                                            Confirm New {displayField}
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type={inputType}
                                                                name="confirm-new-value"
                                                                id="confirm-new-value"
                                                                className="bg-main-dark text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-main-black rounded-md"
                                                                value={confirmValue}
                                                                onChange={e => setConfirmValue(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                <div>
                                                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-100">
                                                        Current Password
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="password"
                                                            name="current-password"
                                                            id="current-password"
                                                            className="bg-main-dark text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-main-black rounded-md"
                                                            value={currentPassword}
                                                            onChange={e => setCurrentPassword(e.target.value)}
                                                            onKeyDown={(e) => handleSubmit(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <PrimaryButton onClick={updateValue} isLoading={isLoading}>
                                        Update
                                    </PrimaryButton>
                                    <SecondaryButton className='mr-3' onClick={() => setOpen(false)}>
                                        Cancel
                                    </SecondaryButton>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
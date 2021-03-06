import { Dialog } from '@headlessui/react';
import { PayloadAction } from '@reduxjs/toolkit';
import React, { FunctionComponent, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { postUpdateChannelAsync } from '../../features/channels/channelsSlice';
import { postUpdateServerAsync } from '../../features/servers/serversSlice';
import { postUpdateUserAsync } from '../../features/user/userSlice';
import { ErrorResponse } from '../../types';
import { PrimaryButton } from '../buttons/Buttons';
import ErrorBox from '../ErrorBox';
import { ActionModal } from '../Modal';

type UpdateFieldProps = BaseUpdateFieldProps & {
    callback: (field: string, value: string, currentPassword: string) => Promise<PayloadAction<unknown, string, {
        arg: {
            name?: string | undefined;
            email?: string | undefined;
            password?: string | undefined;
            currentPassword: string;
        };
        requestId: string;
        requestStatus: "fulfilled";
    }, never> | PayloadAction<unknown, string, any, never>>,
    requirePasswordConfirmation?: boolean,
};

type BaseUpdateFieldProps = {
    field: string,
    displayField: string,
    inputType: React.HTMLInputTypeAttribute,
    requireValueConfirmation?: boolean,
};

export const UpdateField: FunctionComponent<UpdateFieldProps> = ({ callback, field, displayField, inputType, requireValueConfirmation = false, requirePasswordConfirmation = false }): JSX.Element => {
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

            if (value.trim().length === 0 || (requirePasswordConfirmation && currentPassword.trim().length === 0) || (requireValueConfirmation && confirmValue.trim().length === 0)) {
                setError('Please fill out all fields.');

                return;
            }

            const status = await callback(field, value, currentPassword);

            if (status.type === postUpdateUserAsync.rejected.type) {
                const errorResponse = status.payload as ErrorResponse;

                switch (errorResponse.status) {
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
            <ActionModal open={open} setOpen={setOpen} initialFocus={valueRef} actionName='Update' onAction={updateValue} isLoading={isLoading}>
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <ErrorBox className='mb-3' error={error} />
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
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
                                            onKeyDown={handleSubmit}
                                            ref={valueRef}
                                            data-testid="field-value"
                                        />
                                    </div>
                                </div>
                                {requireValueConfirmation && (
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
                                                onKeyDown={handleSubmit}
                                                data-testid="confirm-value"
                                            />
                                        </div>
                                    </div>
                                )}
                                {requirePasswordConfirmation && (
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
                                                data-testid="current-password"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ActionModal>
        </>
    );
}

export const UpdateUserField: FunctionComponent<BaseUpdateFieldProps> = ({ field, displayField, inputType, requireValueConfirmation = false }): JSX.Element => {
    const dispatch = useAppDispatch();

    const callback = async (field: string, value: string, currentPassword: string) => {
        return dispatch(postUpdateUserAsync({ [field]: value, currentPassword }));
    };

    return <UpdateField callback={callback} field={field} displayField={displayField} inputType={inputType} requireValueConfirmation={requireValueConfirmation} requirePasswordConfirmation={true} />
};

type UpdateServerFieldProps = BaseUpdateFieldProps & {
    serverId: string,
};

export const UpdateServerField: FunctionComponent<UpdateServerFieldProps> = ({ serverId, field, displayField, inputType, requireValueConfirmation = false }): JSX.Element => {
    const dispatch = useAppDispatch();

    const callback = async (field: string, value: string) => {
        return dispatch(postUpdateServerAsync({ [field]: value, serverId }));
    };

    return <UpdateField callback={callback} field={field} displayField={displayField} inputType={inputType} requireValueConfirmation={requireValueConfirmation} requirePasswordConfirmation={false} />
};

type UpdateChannelFieldProps = BaseUpdateFieldProps & {
    channelId: string,
};

export const UpdateChannelField: FunctionComponent<UpdateChannelFieldProps> = ({ channelId, field, displayField, inputType, requireValueConfirmation = false }): JSX.Element => {
    const dispatch = useAppDispatch();

    const callback = async (field: string, value: string) => {
        return dispatch(postUpdateChannelAsync({ [field]: value, channelId }));
    };

    return <UpdateField callback={callback} field={field} displayField={displayField} inputType={inputType} requireValueConfirmation={requireValueConfirmation} requirePasswordConfirmation={false} />
};

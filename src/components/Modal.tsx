import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, FunctionComponent } from 'react';
import { PrimaryButton, SecondaryButton } from './buttons/Buttons';

type ModalProps = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    initialFocus?: React.MutableRefObject<HTMLElement | null>,
};

export const Modal: FunctionComponent<ModalProps> = ({ children, open, setOpen, initialFocus }): JSX.Element => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={initialFocus} onClose={setOpen}>
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
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

type ActionModalProps = ModalProps & {
    actionName: string,
    isLoading?: boolean,
    onAction: () => void,
    onCancel?: () => void,
};

export const ActionModal: FunctionComponent<ActionModalProps> = ({ children, open, setOpen, initialFocus, actionName, isLoading = false, onAction, onCancel }): JSX.Element => {
    return (
        <Modal open={open} setOpen={setOpen} initialFocus={initialFocus}>
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {children}
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <PrimaryButton isLoading={isLoading} onClick={onAction}>
                    {actionName}
                </PrimaryButton>
                <SecondaryButton className='mr-3' onClick={onCancel ? onCancel : () => setOpen(false)}>
                    Cancel
                </SecondaryButton>
            </div>
        </Modal>
    );
};

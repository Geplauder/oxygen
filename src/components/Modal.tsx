import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, FunctionComponent } from 'react';

type ModalProps = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    initialFocus: React.MutableRefObject<HTMLElement | null>,
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
    onAction: () => void,
    onCancel?: () => void,
};

export const ActionModal: FunctionComponent<ActionModalProps> = ({ children, open, setOpen, initialFocus, actionName, onAction, onCancel }): JSX.Element => {
    return (
        <Modal open={open} setOpen={setOpen} initialFocus={initialFocus}>
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {children}
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onAction}
                >
                    {actionName}
                </button>
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onCancel ? onCancel : () => setOpen(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

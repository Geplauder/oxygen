import { Dialog, Transition } from '@headlessui/react';
import { PlusSmIcon } from '@heroicons/react/solid';
import React, { Fragment, useRef, useState } from 'react';
import Tooltip from '../../components/Tooltip';
import CreateServer from './CreateServer';
import JoinServer from './JoinServer';

export default function AddServer(): JSX.Element {
    const [open, setOpen] = useState(false);
    const [openCreateServer, setOpenCreateServer] = useState(false);
    const [openJoinServer, setOpenJoinServer] = useState(false);

    const cancelButtonRef = useRef(null);

    return (
        <>
            <Tooltip placement="right" content="Add Server">
                <button onClick={() => setOpen(true)}>
                    <div className='flex items-center justify-center transition bg-indigo-500 bg-opacity-20 hover:bg-opacity-40 w-14 h-14 rounded-full'>
                        <PlusSmIcon className='text-indigo-500 w-10 h-10' />
                    </div>
                </button>
            </Tooltip>
            <CreateServer open={openCreateServer} setOpen={setOpenCreateServer} />
            <JoinServer open={openJoinServer} setOpen={setOpenJoinServer} />
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                            <div className="inline-block align-bottom bg-main rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white">
                                            Add Server
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-100">
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
                                                pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
                                        onClick={() => { setOpen(false); setOpenCreateServer(true); }}
                                    >
                                        Create
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                        onClick={() => { setOpen(false); setOpenJoinServer(true); }}
                                    >
                                        Join
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-3 sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
import { Dialog } from '@headlessui/react';
import { PlusSmIcon } from '@heroicons/react/solid';
import React, { useRef, useState } from 'react';
import { Modal } from '../../components/Modal';
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
            <Modal open={open} setOpen={setOpen} initialFocus={cancelButtonRef}>
                <div className='px-4 pt-5 pb-4'>
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
            </Modal>
        </>
    )
}
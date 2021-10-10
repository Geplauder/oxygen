import React from 'react';
import moment from 'moment';
import { Message as MessageObject } from '../../types';
import UserAvatar from '../user/UserAvatar';
import { DotsHorizontalIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';

export default function Message({ message }: { message: MessageObject }): JSX.Element {
    return (
        <div className='flex space-x-4 px-4 py-2 mr-1 hover:bg-messages-highlight group'>
            <div>
                <UserAvatar user={message.user} size='normal' />
            </div>
            <div className='text-white flex-grow'>
                <p className='font-semibold'>
                    {message.user.username} <span className='ml-1 font-normal text-[8pt] text-gray-300 cursor-default'>{moment(message.created_at).calendar()}</span>
                </p>
                <p>
                    {message.content}
                </p>
            </div>

            <Menu as='div' className='relative'>
                <div>
                    <Menu.Button className='text-white hidden group-hover:block h-6 w-6 rounded hover:bg-button-highlight'>
                        <DotsHorizontalIcon className='h-4 w-6' aria-hidden='true' />
                    </Menu.Button>
                </div>
                <Transition
                    as={React.Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='p-2 bg-contextmenu rounded text-gray-200'>
                            <Menu.Item>
                                {({ active }) => (
                                    <button className='flex hover:bg-contextmenu-highlight rounded p-2 w-full'>
                                        <PencilIcon className='w-5 h-5 mr-2' aria-hidden='true' />

                                        Update message
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button className='flex hover:bg-contextmenu-highlight rounded p-2 w-full'>
                                        <TrashIcon className='w-5 h-5 mr-2' aria-hidden='true' />

                                        Delete message
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

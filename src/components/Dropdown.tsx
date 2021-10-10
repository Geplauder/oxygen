import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';

export default function Dropdown({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex items-center p-2 mr-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white transition-colors hover:bg-indigo-500 hover:bg-opacity-25">
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-main-black ring-1 ring-black ring-opacity-5 divide-y divide-[#202126] focus:outline-none">
                    {children}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
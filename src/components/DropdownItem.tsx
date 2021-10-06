import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';

export default function DropdownItem({ children, icon, onClick }: { children: React.ReactNode, icon: React.ElementType, onClick: MouseEventHandler }): JSX.Element {
    const iconElement = React.createElement(icon, {
        className: 'mr-3 h-5 w-5 white group-hover:white',
    });

    return (
        <Menu.Item>
            {({ active }) => (
                <button
                    onClick={onClick}
                    className={classNames(
                        active ? 'bg-[#26282e] text-white' : 'text-white',
                        'group flex items-center px-4 py-2 w-full text-sm'
                    )}
                >
                    {iconElement}
                    {children}
                </button>
            )}
        </Menu.Item>
    );
}
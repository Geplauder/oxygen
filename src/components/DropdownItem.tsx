import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';

export default function DropdownItem({ children, icon, onClick, danger = false }: { children: React.ReactNode, icon?: React.ElementType, onClick?: MouseEventHandler, danger?: boolean }): JSX.Element {
    return (
        <Menu.Item>
            {({ active }) => (
                <button
                    onClick={onClick}
                    className={classNames(
                        { 'bg-indigo-500 bg-opacity-10': active },
                        danger ? 'text-red-500' : 'text-white',
                        'group flex items-center px-4 py-2 w-full text-sm'
                    )}
                >
                    {icon && (
                        React.createElement(icon, {
                            className: 'mr-3 h-5 w-5 white group-hover:white',
                        })
                    )}
                    {children}
                </button>
            )}
        </Menu.Item>
    );
}
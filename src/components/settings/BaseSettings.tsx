import React from 'react';
import { XIcon } from '@heroicons/react/solid';
import { Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const SettingsButton = ({ children, onClick, icon, isDanger = false }: { children?: React.ReactNode, onClick: () => void, icon?: React.ElementType, isDanger?: boolean }): JSX.Element => {
    return (
        <button
            onClick={onClick}
            className={classNames(
                'w-full group border-transparent border-l-2 py-2 px-3 flex items-center text-sm font-medium transition-colors hover:bg-indigo-500 hover:bg-opacity-10 hover:border-l-2 hover:border-indigo-500 hover:border-opacity-50',
                isDanger ? 'text-red-500' : 'text-white'
            )}
        >
            {icon && (
                React.createElement(icon, {
                    className: 'mr-3 flex-shrink-0 h-6 w-6',
                })
            )}
            {children}
        </button>
    );
};

export const SettingsLink = ({ children, to, icon }: { children?: React.ReactNode, to: string, icon?: React.ElementType }): JSX.Element => {
    return (
        <NavLink
            to={to}
            className='group border-transparent border-l-2 py-2 px-3 flex items-center text-sm font-medium text-white transition-colors hover:bg-indigo-500 hover:bg-opacity-10 hover:border-l-2 hover:border-indigo-500 hover:border-opacity-50'
            activeClassName='bg-indigo-500 bg-opacity-25 border-indigo-600'
        >
            {icon && (
                React.createElement(icon, {
                    className: 'text-white mr-3 flex-shrink-0 h-6 w-6',
                })
            )}
            {children}
        </NavLink>
    );
};

export const Settings = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <div className="relative h-screen bg-main overflow-hidden flex">
            {children}
        </div>
    );
}

export const SettingsContent = ({ children, onGoBack }: { children?: React.ReactNode, onGoBack: () => void }): JSX.Element => {
    return (
        <div className="flex-1 flex flex-col">
            <main className="flex-1 overflow-y-auto focus:outline-none">
                <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                    <div className="pt-10 pb-16">
                        <div className="flex px-4 sm:px-6 md:px-0">
                            <h1 className="flex-1 text-3xl font-extrabold text-white">Settings</h1>
                            <div className="ml-4 flex items-center md:ml-6">
                                <button
                                    type="button"
                                    className="rounded-full p-2 text-white hover:text-gray-200 transition-colors hover:bg-indigo-500 hover:bg-opacity-25"
                                    onClick={onGoBack}
                                    data-testid='settings-go-back'
                                >
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                        <div className="px-4 sm:px-6 md:px-0">
                            <Switch>
                                {children}
                            </Switch>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export const SettingsNavigation = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="w-64 flex flex-col">
                <nav className="bg-main-dark border-r border-main-black pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
                    {children}
                </nav>
            </div>
        </div>
    );
}

export const SettingsNavigationTop = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <div className="flex-grow mt-5 flex flex-col">
            <div className="flex-1 space-y-1">
                {children}
            </div>
        </div>
    );
}

export const SettingsNavigationBottom = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <div className="flex-shrink-0 block w-full">
            {children}
        </div>
    );
}
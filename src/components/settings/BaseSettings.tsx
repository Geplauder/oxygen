import React from 'react';
import { XCircleIcon } from '@heroicons/react/solid';
import { Switch } from 'react-router';
import { NavLink } from 'react-router-dom';

export const SettingsLink = ({ children, to, icon }: { children: React.ReactNode, to: string, icon: React.ElementType }): JSX.Element => {
    const iconElement = React.createElement(icon, {
        className: 'text-white mr-3 flex-shrink-0 h-6 w-6',
    });

    return (
        <NavLink
            to={to}
            className='group border-transparent border-l-2 py-2 px-3 flex items-center text-sm font-medium text-white hover:bg-indigo-500 hover:bg-opacity-10 hover:border-l-2 hover:border-indigo-500 hover:border-opacity-50'
            activeClassName='bg-indigo-500 bg-opacity-25 border-indigo-600'
        >
            {iconElement}
            {children}
        </NavLink>
    )
};

export const Settings = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <div className="relative h-screen bg-main overflow-hidden flex">
            {children}
        </div>
    );
}

export const SettingsContent = ({ children, onGoBack }: { children: React.ReactNode, onGoBack: () => void }): JSX.Element => {
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
                                    className="rounded-full p-1 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={onGoBack}
                                >
                                    <XCircleIcon className="h-6 w-6" aria-hidden="true" />
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
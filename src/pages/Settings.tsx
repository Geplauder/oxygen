import React from 'react';
import { LogoutIcon, CogIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';
import UserSettings from '../components/settings/UserSettings';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { invalidateToken } from '../features/auth/authSlice';

const SettingsLink = ({ children, to, icon }: { children: React.ReactNode, to: string, icon: React.ElementType }): JSX.Element => {
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

export default function Settings(): JSX.Element {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { path, url } = useRouteMatch();

    const executeLogout = () => {
        dispatch(invalidateToken());

        history.push('/login');
    };

    const goBack = () => {
        history.push('/');
    };

    return (
        <div className="relative h-screen bg-main overflow-hidden flex">
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="w-64 flex flex-col">
                    <nav className="bg-main-dark border-r border-main-black pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
                        <div className="flex-grow mt-5 flex flex-col">
                            <div className="flex-1 space-y-1">
                                <SettingsLink to={`${url}/user`} icon={CogIcon} >
                                    User Settings
                                </SettingsLink>
                            </div>
                        </div>
                        <div className="flex-shrink-0 block w-full">
                            <button
                                className="group w-full border-transparent border-l-2 py-2 px-3 flex items-center text-sm font-medium text-white hover:bg-indigo-500 hover:bg-opacity-10 hover:border-l-2 hover:border-indigo-500 hover:border-opacity-50"
                                onClick={executeLogout}
                            >
                                <LogoutIcon className="mr-3 h-6 w-6" aria-hidden="true" />
                                Logout
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

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
                                        onClick={goBack}
                                    >
                                        <XCircleIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            <div className="px-4 sm:px-6 md:px-0">
                                <Switch>
                                    <Route path={`${path}/user`}>
                                        <UserSettings />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
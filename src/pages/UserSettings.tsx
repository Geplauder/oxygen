import React from 'react';
import { LogoutIcon, CogIcon } from '@heroicons/react/outline';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import { invalidateToken } from '../features/auth/authSlice';
import { Settings, SettingsContent, SettingsLink, SettingsNavigation, SettingsNavigationBottom, SettingsNavigationTop } from '../components/settings/BaseSettings';
import UserInfoSettings from '../components/settings/UserInfoSettings';

export default function UserSettings(): JSX.Element {
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
        <Settings>
            <SettingsNavigation>
                <SettingsNavigationTop>
                    <SettingsLink to={`${url}/user`} icon={CogIcon} >
                        User Settings
                    </SettingsLink>
                </SettingsNavigationTop>
                <SettingsNavigationBottom>
                    <button
                        className="group w-full border-transparent border-l-2 py-2 px-3 flex items-center text-sm font-medium text-white hover:bg-indigo-500 hover:bg-opacity-10 hover:border-l-2 hover:border-indigo-500 hover:border-opacity-50"
                        onClick={executeLogout}
                    >
                        <LogoutIcon className="mr-3 h-6 w-6" aria-hidden="true" />
                        Logout
                    </button>
                </SettingsNavigationBottom>
            </SettingsNavigation>
            <SettingsContent onGoBack={goBack}>
                <Route path={`${path}/user`}>
                    <UserInfoSettings />
                </Route>
            </SettingsContent>
        </Settings>
    );
}

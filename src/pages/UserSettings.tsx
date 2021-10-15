import React from 'react';
import { LogoutIcon, CogIcon } from '@heroicons/react/outline';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import { invalidateToken } from '../features/auth/authSlice';
import { Settings, SettingsButton, SettingsContent, SettingsLink, SettingsNavigation, SettingsNavigationBottom, SettingsNavigationTop } from '../components/settings/BaseSettings';
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
                    <SettingsButton onClick={executeLogout} icon={LogoutIcon} isDanger={true}>
                        Logout
                    </SettingsButton>
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

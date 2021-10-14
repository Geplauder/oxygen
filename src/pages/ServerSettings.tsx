import React from 'react';
import { CogIcon } from '@heroicons/react/outline';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { Settings, SettingsContent, SettingsLink, SettingsNavigation, SettingsNavigationBottom, SettingsNavigationTop } from '../components/settings/BaseSettings';
import ServerInfoSettings from '../components/settings/ServerInfoSettings';

export default function UserSettings(): JSX.Element {
    const history = useHistory();
    const { path, url } = useRouteMatch();

    const goBack = () => {
        history.push('/');
    };

    return (
        <Settings>
            <SettingsNavigation>
                <SettingsNavigationTop>
                    <SettingsLink to={`${url}/server`} icon={CogIcon} >
                        Server Settings
                    </SettingsLink>
                </SettingsNavigationTop>
                <SettingsNavigationBottom>
                </SettingsNavigationBottom>
            </SettingsNavigation>
            <SettingsContent onGoBack={goBack}>
                <Route path={`${path}/server`}>
                    <ServerInfoSettings />
                </Route>
            </SettingsContent>
        </Settings>
    );
}

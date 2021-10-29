import React, { useState } from 'react';
import { CogIcon } from '@heroicons/react/outline';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { Settings, SettingsButton, SettingsContent, SettingsLink, SettingsNavigation, SettingsNavigationBottom, SettingsNavigationTop } from '../components/settings/BaseSettings';
import ServerInfoSettings from '../components/settings/ServerInfoSettings';
import DeleteServer from '../features/servers/DeleteServer';
import { TrashIcon, UserAddIcon } from '@heroicons/react/solid';
import ServerInviteSettings from '../components/settings/ServerInviteSettings';

export default function ServerSettings(): JSX.Element {
    const history = useHistory();
    const { path, url } = useRouteMatch();

    const [openDelete, setOpenDelete] = useState<boolean>(false);

    const goBack = () => {
        history.push('/');
    };

    return (
        <Settings>
            <SettingsNavigation>
                <SettingsNavigationTop>
                    <SettingsLink to={`${url}/server`} icon={CogIcon}>
                        Server Settings
                    </SettingsLink>
                    <SettingsLink to={`${url}/invites`} icon={UserAddIcon}>
                        Invites
                    </SettingsLink>
                </SettingsNavigationTop>
                <SettingsNavigationBottom>
                    <SettingsButton onClick={() => setOpenDelete(true)} icon={TrashIcon} isDanger={true}>
                        <DeleteServer open={openDelete} setOpen={setOpenDelete} />
                    </SettingsButton>
                </SettingsNavigationBottom>
            </SettingsNavigation>
            <SettingsContent onGoBack={goBack}>
                <Route path={`${path}/server`}>
                    <ServerInfoSettings />
                </Route>
                <Route path={`${path}/invites`}>
                    <ServerInviteSettings />
                </Route>
            </SettingsContent>
        </Settings>
    );
}

import React, { useState } from 'react';
import { CogIcon } from '@heroicons/react/outline';
import { Redirect, Route, useHistory, useParams, useRouteMatch } from 'react-router';
import { Settings, SettingsButton, SettingsContent, SettingsLink, SettingsNavigation, SettingsNavigationBottom, SettingsNavigationTop } from '../components/settings/BaseSettings';
import { TrashIcon } from '@heroicons/react/solid';
import ChannelInfoSettings from '../components/settings/ChannelInfoSettings';
import { useAppSelector } from '../app/hooks';
import { selectCurrentChannels } from '../features/channels/channelsSlice';
import DeleteChannel from '../features/channels/DeleteChannel';

export default function ChannelSettings(): JSX.Element {
    const history = useHistory();
    const { path, url } = useRouteMatch();

    const { id } = useParams<{ id: string }>();

    const [openDelete, setOpenDelete] = useState<boolean>(false);

    const channels = useAppSelector(selectCurrentChannels);

    const channel = channels?.channels.find(x => x.id === id);

    if (!channel) {
        return <Redirect to='/' />;
    }

    const goBack = () => {
        history.push('/');
    };

    return (
        <Settings>
            <SettingsNavigation>
                <SettingsNavigationTop>
                    <SettingsLink to={`${url}/channel`} icon={CogIcon} >
                        Channel Settings
                    </SettingsLink>
                </SettingsNavigationTop>
                <SettingsNavigationBottom>
                    <SettingsButton onClick={() => setOpenDelete(true)} icon={TrashIcon} isDanger={true}>
                        <DeleteChannel channel={channel} open={openDelete} setOpen={setOpenDelete} />
                    </SettingsButton>
                </SettingsNavigationBottom>
            </SettingsNavigation>
            <SettingsContent onGoBack={goBack}>
                <Route path={`${path}/channel`}>
                    <ChannelInfoSettings channel={channel} />
                </Route>
            </SettingsContent>
        </Settings>
    );
}

import React, { useState } from 'react';
import ChannelName from './channel-name';
import Channels from './channels';
import MessageBox from './message-box';
import Messages from './messages';
import ServerName from './server-name';
import UserInfo from './user-info';
import UserList from './user-list';
import PropTypes from 'prop-types';

const Content = ({ user, selectedServer }) => {
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [updateMessages, setUpdateMessages] = useState(false);

    return (
        <div className="flex w-full">
            <div className="bg-channels w-64 flex flex-col">
                <ServerName selectedServer={selectedServer} />
                <Channels selectedServer={selectedServer} selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} />
                <UserInfo user={user} />
            </div>
            <div className="bg-messages flex flex-col flex-grow h-screen">
                <ChannelName selectedChannel={selectedChannel} />
                <Messages selectedChannel={selectedChannel} updateMessages={updateMessages} />
                <MessageBox selectedChannel={selectedChannel} setUpdateMessages={setUpdateMessages} />
            </div>
            <UserList selectedServer={selectedServer} />
        </div>
    );
};

Content.propTypes = {
    user: PropTypes.object,
    selectedServer: PropTypes.object
};

export default Content;
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAxios } from '../utility/api';
import PropTypes from 'prop-types';

const Channels = ({ selectedServer, selectedChannel, setSelectedChannel }) => {
    const bearerToken = useSelector(state => state.auth.bearerToken);

    const [channels, setChannels] = useState(null);

    useEffect(() => {
        setChannels(null);

        const axios = getAxios(bearerToken);

        axios.get(`servers/${selectedServer.id}/channels`)
            .then(x => {
                setSelectedChannel(x.data[0]);
                setChannels(x.data);
            });
    }, [selectedServer]);

    return (
        <div className='flex flex-grow flex-col space-y-2 mx-2 my-2'>
            {channels && channels.map((channel, idx) => (
                <div key={idx} onClick={() => setSelectedChannel(channel)}
                    className={classNames('rounded-md cursor-pointer font-semibold px-2 py-1 hover:bg-channels-highlight',
                        selectedChannel.id === channel.id ? 'text-white bg-channels-selected hover:bg-channels-selected' : 'text-channels-text')}>
                    <p className='text-lg select-none'>
                        <span># </span>
                        {channel.name}
                    </p>
                </div>
            ))}
        </div>
    );
};

Channels.propTypes = {
    selectedServer: PropTypes.object,
    selectedChannel: PropTypes.object,
    setSelectedChannel: PropTypes.func
};

export default Channels;
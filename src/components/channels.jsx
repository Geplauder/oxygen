import classNames from 'classnames';
import React from 'react';

const Channels = ({ channels, selectedChannel, setSelectedChannel }) => {
    return (
        <div className='flex flex-col space-y-2 mx-2 my-2'>
            {channels && channels.map((channel, idx) => (
                <div key={idx} onClick={() => setSelectedChannel(channel)} className={classNames('hover:bg-gray-400 rounded-md cursor-pointer px-2 py-1', { 'bg-gray-400 font-semibold': selectedChannel.id === channel.id })}>
                    <p className='text-white text-lg select-none'>
                        <span># </span>
                        {channel.name}
                    </p>
                </div>
            ))}
        </div>
    )
};

export default Channels;
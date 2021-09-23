import React from 'react';
import PropTypes from 'prop-types';

const ChannelName = ({ selectedChannel }) => {
    return (
        <div className="h-12 border-b border-gray-600">
            <div className="flex items-center h-12 border-b border-gray-800">
                <p className='mx-4 text-white text-xl font-semibold select-none'>
                    <span># </span>
                    {selectedChannel?.name}
                </p>
            </div>
        </div>
    );
};

ChannelName.propTypes = {
    selectedChannel: PropTypes.object
};

export default ChannelName;
import React from 'react';
import PropTypes from 'prop-types';

const ServerName = ({ selectedServer }) => {
    return (
        <div className="flex items-center h-12 border-b border-gray-800">
            <p className='mx-4 text-white text-xl font-semibold select-none'>{selectedServer?.name}</p>
        </div>
    );
};

ServerName.propTypes = {
    selectedServer: PropTypes.object
};

export default ServerName;
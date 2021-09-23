import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = ({ user }) => {
    return (
        <div className="h-12 bg-userinfo flex items-center">
            <p className='mx-4 text-white text-lg font-semibold select-none'>
                {user.username}
            </p>
        </div>
    );
};

UserInfo.propTypes = {
    user: PropTypes.object
};

export default UserInfo;
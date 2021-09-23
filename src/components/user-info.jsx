import React from 'react';

const UserInfo = ({ user }) => {
    return (
        <div className="h-12 bg-userinfo flex items-center">
            <p className='mx-4 text-white text-lg font-semibold select-none'>
                {user.username}
            </p>
        </div>
    )
};

export default UserInfo;
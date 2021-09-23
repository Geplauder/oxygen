import React from 'react';

const UserList = ({ users }) => {
    if (users === null) {
        return <></>;
    }

    return (
        <div>
            {users.map((user, idx) => (
                <div key={idx} className='flex items-center space-x-4 mx-2 px-2 my-2 py-1 rounded-md hover:bg-gray-400'>
                    <div>
                        <div className='w-12 h-12 bg-red-500 rounded-full'></div>
                    </div>
                    <div className='text-white text-lg select-none'>
                        <p>{user.username}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default UserList;
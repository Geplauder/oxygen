import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAxios } from '../utility/api';
import PropTypes from 'prop-types';

const UserList = ({ selectedServer }) => {
    const bearerToken = useSelector(state => state.auth.bearerToken);

    const [users, setUsers] = useState(null);

    useEffect(() => {
        const axios = getAxios(bearerToken);

        axios.get(`servers/${selectedServer.id}/users`)
            .then(x => {
                setUsers(x.data);
            });
    }, [selectedServer]);

    return (
        <div className='bg-userlist w-64'>
            {users && users.map((user, idx) => (
                <div key={idx} className='flex items-center space-x-4 mx-2 px-2 my-2 py-1 rounded-md hover:bg-userlist-highlight'>
                    <div>
                        <div className='w-10 h-10 bg-red-500 rounded-full'></div>
                    </div>
                    <div className='text-white font-semibold text-lg select-none'>
                        <p>{user.username}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

UserList.propTypes = {
    selectedServer: PropTypes.object
};

export default UserList;
import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Channels from './channels';
import UserList from './user-list';

const Content = ({ user, selectedServer }) => {
    const bearerToken = useSelector(state => state.auth.bearerToken);

    const [users, setUsers] = useState(null);
    const [channels, setChannels] = useState(null);
    const [messages, setMessages] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState(null);

    const [message, setMessage] = useState('');
    const [updateMessages, setUpdateMessages] = useState(false);

    const sendMessage = async (e) => {
        if (e.key !== 'Enter' || message.length === 0) {
            return;
        }

        axios.post(`http://localhost:8000/channels/${selectedChannel.id}/messages`, {
            content: message,
        }, { headers: { authorization: `Bearer ${bearerToken}` } })
            .then(_ => {
                setUpdateMessages(updateMessages === false);
            });

        setMessage('');
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/servers/${selectedServer.id}/channels`, { headers: { authorization: `Bearer ${bearerToken}` } })
            .then(x => {
                setSelectedChannel(x.data[0]);
                setChannels(x.data);
            });

        axios.get(`http://localhost:8000/servers/${selectedServer.id}/users`, { headers: { authorization: `Bearer ${bearerToken}` } })
            .then(x => {
                setUsers(x.data);
            });
    }, [selectedServer]);

    useEffect(() => {
        if (selectedChannel === null) {
            return;
        }

        axios.get(`http://localhost:8000/channels/${selectedChannel.id}/messages`, { headers: { authorization: `Bearer ${bearerToken}` } })
            .then(x => setMessages(x.data));
    }, [selectedChannel, updateMessages]);

    return (
        <div className="flex w-full">
            <div className="bg-gray-500 w-64 flex flex-col">
                <div className="flex items-center h-12 border-b border-gray-600">
                    <p className='mx-4 text-white text-xl font-semibold select-none'>{selectedServer?.name}</p>
                </div>
                <div className="flex-grow">
                    <Channels channels={channels} selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} />
                </div>
                <div className="h-12 bg-gray-600 flex items-center">
                    <p className='mx-4 text-white text-lg font-semibold select-none'>
                        {user.username}
                    </p>
                </div>
            </div>
            <div className="bg-gray-400 flex flex-col flex-grow">
                <div className="h-12 border-b border-gray-600">
                    <div className="flex items-center h-12 border-b border-gray-600">
                        <p className='mx-4 text-white text-xl font-semibold select-none'>
                            <span># </span>
                            {selectedChannel?.name}
                        </p>
                    </div>
                </div>
                <div className="flex-grow">
                    {messages && messages.map((message, idx) => (
                        <div key={idx} className='flex space-x-4 px-4 py-2'>
                            <div>
                                <div className='w-12 h-12 bg-red-500 rounded-full'></div>
                            </div>
                            <div>
                                <p className='text-white'>
                                    {message.user.username} <span className='font-thin text-xs text-gray-200'>({message.created_at})</span>
                                </p>
                                <p>
                                    {message.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-20 flex items-center">
                    <div className='mx-4 w-full'>
                        <input type="text" className='w-full rounded-lg' placeholder={'Message #' + selectedChannel?.name} value={message} onChange={e => setMessage(e.target.value)} onKeyDown={sendMessage} />
                    </div>
                </div>
            </div>
            <div className="bg-gray-500 w-64">
                <UserList users={users} />
            </div>
        </div>
    );
};

export default Content;
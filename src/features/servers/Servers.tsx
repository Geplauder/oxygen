import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectToken } from '../login/loginSlice';
import { getServersAsync, selectServer, selectServers } from './serversSlice';

export default function Servers(): JSX.Element {
    const dispatch = useAppDispatch();

    const { selectedServer, servers } = useAppSelector(selectServers);

    const token = useAppSelector(selectToken);

    if (token === null) {
        return <Redirect to='/login' />;
    }

    useEffect(() => {
        dispatch(getServersAsync({ token }));
    }, []);

    return (
        <div className="flex flex-col items-center space-y-4 py-4 bg-servers w-20 h-screen">
            {servers && servers.map((server, idx) => (
                <div key={idx} onClick={() => dispatch(selectServer(server))} className="cursor-pointer">
                    <img src="http://placekitten.com/256/256" className={classNames('w-16 h-16 rounded-full', { 'border-2': server.id === selectedServer?.id })} />
                </div>
            ))}
        </div>
    );
}
import classNames from 'classnames';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetServersQuery } from '../../services/backend';
import { selectToken } from '../login/loginSlice';
import { selectServer, selectServers } from './serversSlice';

export default function Servers(): JSX.Element {
    const dispatch = useAppDispatch();

    const { data, error, isLoading } = useGetServersQuery('');

    const { selectedServer } = useAppSelector(selectServers);
    const token = useAppSelector(selectToken);

    if (token === null) {
        return <Redirect to='/login' />;
    }

    return (
        <div className="flex flex-col items-center space-y-4 py-4 bg-servers w-20 h-screen">
            {error ? (<>oh no error</>) : isLoading ? (<>Loading...</>) : data ? (
                <>
                    {data.map((server, idx) => (
                        <div key={idx} onClick={() => dispatch(selectServer(server))} className="cursor-pointer">
                            <img src="http://placekitten.com/256/256" className={classNames('w-16 h-16 rounded-full', { 'border-2': selectedServer?.id === server.id })} />
                        </div>
                    ))}
                </>
            ) : null}
        </div>
    );
}
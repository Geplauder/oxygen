import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Channels from "../features/channels/Channels";
import { selectToken } from "../features/login/loginSlice";
import Servers from "../features/servers/Servers";
import { selectServers } from "../features/servers/serversSlice";
import { getUserAsync, selectUser } from "../features/user/userSlice";

export default function Index(): JSX.Element {
    const dispatch = useAppDispatch();

    const token = useAppSelector(selectToken);
    const user = useAppSelector(selectUser);

    const { selectedServer } = useAppSelector(selectServers);

    if (token === null) {
        return <Redirect to='/login' />;
    }

    useEffect(() => {
        dispatch(getUserAsync({ token }));
    }, []);

    return (
        <>
            {user === null ? (
                <div>Loading...</div>
            ) : (
                <div className="flex max-h-screen w-full">
                    <Servers />
                    {selectedServer !== null && (
                        <Channels selectedServer={selectedServer} />
                    )}
                </div>
            )}
        </>
    );
}
import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Channels from "../features/channels/Channels";
import { selectToken } from "../features/login/loginSlice";
import Servers from "../features/servers/Servers";
import { getUserAsync, selectUser } from "../features/user/userSlice";

export default function Index(): JSX.Element {
    const dispatch = useAppDispatch();

    const token = useAppSelector(selectToken);
    const { user, isConnected } = useAppSelector(selectUser);

    if (token === null) {
        return <Redirect to='/login' />;
    }

    useEffect(() => {
        dispatch(getUserAsync({ token }));
    }, []);

    return (
        <>
            {user === null || isConnected === false ? (
                <div>Loading...</div>
            ) : (
                <div className="flex max-h-screen w-full">
                    <Servers />
                    <Channels />
                </div>
            )}
        </>
    );
}
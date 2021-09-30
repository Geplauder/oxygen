import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Loading from "../components/Loading";
import Channels from "../features/channels/Channels";
import Servers from "../features/servers/Servers";
import { getUserAsync, selectUser } from "../features/user/userSlice";

export default function Index(): JSX.Element {
    const dispatch = useAppDispatch();

    const { user, isConnected } = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(getUserAsync());
    }, []);

    return (
        <>
            {user === null || isConnected === false ? (
                <Loading />
            ) : (
                <div className="flex max-h-screen w-full">
                    <Servers />
                    <Channels />
                </div>
            )}
        </>
    );
}
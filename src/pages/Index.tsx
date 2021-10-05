import React from "react";
import { useAppSelector } from "../app/hooks";
import ConnectionState from "../components/ConnectionState";
import Loading from "../components/Loading";
import Channels from "../features/channels/Channels";
import Servers from "../features/servers/Servers";
import { selectUser } from "../features/user/userSlice";

export default function Index(): JSX.Element {
    const { user, isConnected } = useAppSelector(selectUser);

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
            <ConnectionState />
        </>
    );
}
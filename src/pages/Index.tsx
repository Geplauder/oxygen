import React from "react";
import { useAppSelector } from "../app/hooks";
import ConnectionState from "../components/ConnectionState";
import Loading from "../components/Loading";
import ChannelList from "../features/channels/ChannelList";
import ServerList from "../features/servers/ServerList";
import { selectUser } from "../features/user/userSlice";

export default function Index(): JSX.Element {
    const { user, isConnected } = useAppSelector(selectUser);

    return (
        <>
            {user === null || isConnected === false ? (
                <Loading />
            ) : (
                <div className="flex max-h-screen w-full">
                    <ServerList />
                    <ChannelList />
                </div>
            )}
            <ConnectionState />
        </>
    );
}
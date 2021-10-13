import React, { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useAppDispatch } from "../../app/hooks";
import { postChannelAsync } from "./channelsSlice";
import { Server } from "../../types";
import { ActionModal } from "../../components/Modal";

export default function CreateChannel({
    selectedServer,
    open,
    setOpen,
}: {
    selectedServer: Server | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
    const dispatch = useAppDispatch();

    const [channelName, setChannelName] = useState("New Channel");
    const inputRef = useRef(null);

    if (selectedServer === null) {
        return <div />;
    }

    const createChannel = () => {
        dispatch(
            postChannelAsync({ serverId: selectedServer?.id, name: channelName })
        );
        setOpen(false);
    };

    const handleSubmit = (event: React.KeyboardEvent) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        createChannel();
    };

    return (
        <ActionModal open={open} setOpen={setOpen} initialFocus={inputRef} actionName='Create' onAction={createChannel}>
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-white"
                        >
                            Create Channel
                        </Dialog.Title>
                        <div className="mt-2">
                            <div>
                                <label
                                    htmlFor="channel-name"
                                    className="block text-sm font-medium text-gray-100"
                                >
                                    Channel Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="channel-name"
                                        id="channel-name"
                                        className="bg-main-dark text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-main-black rounded-md"
                                        ref={inputRef}
                                        value={channelName}
                                        onChange={(e) => setChannelName(e.target.value)}
                                        onKeyDown={(e) => handleSubmit(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ActionModal>
    );
}

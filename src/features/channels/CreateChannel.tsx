import React, { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useAppDispatch } from "../../app/hooks";
import { postChannelAsync } from "./channelsSlice";
import { ErrorResponse, Server } from "../../types";
import { ActionModal } from "../../components/Modal";
import ErrorBox from "../../components/ErrorBox";

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

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [channelName, setChannelName] = useState("New Channel");
    const inputRef = useRef(null);

    if (selectedServer === null) {
        return <div />;
    }

    const createChannel = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (channelName.trim().length === 0) {
                setError('Please fill out all fields.');

                return;
            }

            const status = await dispatch(postChannelAsync({ serverId: selectedServer?.id, name: channelName }));

            if (status.type === postChannelAsync.rejected.type) {
                const errorResponse = status.payload as ErrorResponse;

                switch (errorResponse.status) {
                    case 400: {
                        setError(errorResponse.data);

                        return;
                    }
                    case 403: {
                        setError('You do not have permission to create a channel in this server.');

                        return;
                    }
                    case 500: {
                        setError('Whoops, something went wrong. Please try again later.');

                        return;
                    }
                }
            }

            setOpen(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (event: React.KeyboardEvent) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        await createChannel();
    };

    return (
        <ActionModal open={open} setOpen={setOpen} initialFocus={inputRef} actionName='Create' onAction={createChannel} isLoading={isLoading}>
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <ErrorBox className='mb-4' error={error} />
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

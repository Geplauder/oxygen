import React from 'react';
import { Channel } from '../types';

export default function ChannelName({ selectedChannel }: { selectedChannel: Channel | null }): JSX.Element {
    if (selectedChannel === null) {
        return <div />;
    }

    return (
        <div className="h-12 bg-main">
            <div className="flex items-center h-12 border-b border-main-black">
                <p className='mx-4 text-white text-xl font-semibold select-none'>
                    <span># </span>
                    {selectedChannel.name}
                </p>
            </div>
        </div>
    );
}
import React from 'react';
import { Server } from '../types';

export default function ServerName({ selectedServer }: { selectedServer: Server | null }): JSX.Element {
    return (
        <div className="flex items-center h-12 border-b border-gray-800">
            <p className='mx-4 text-white text-xl font-semibold select-none'>{selectedServer?.name}</p>
        </div>
    );
}
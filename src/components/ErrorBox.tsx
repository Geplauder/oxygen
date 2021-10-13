import { XCircleIcon } from '@heroicons/react/solid';
import React from 'react';

export default function ErrorBox({ error }: { error: string | null }): JSX.Element {
    return (
        <>
            {error && (
                <div className="rounded-md bg-red-600 text-white p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium">{error}</h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
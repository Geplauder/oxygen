import React, { useEffect, useState } from 'react';

export default function Loading(): JSX.Element {
    const [connectionIssues, setConnectionIssues] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setConnectionIssues(true), 5 * 1000);

        return () => clearTimeout(timer);
    });

    const clearLocalStorage = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <>
            <div className='flex flex-col space-y-4 items-center justify-center w-full h-screen bg-main'>
                <p className='text-white font-semibold text-2xl'>Connecting</p>
                <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>

                {connectionIssues && (
                    <p className='text-white font-semibold text-2xl'>This takes longer than usual 😟</p>
                )}
            </div>
            <button className="absolute left-2 bottom-2 text-xs text-gray-400 underline" onClick={clearLocalStorage}>Clear LocalStorage</button>
        </>
    );
}
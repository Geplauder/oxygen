import React from 'react';

export default function PrimaryButton({ children, onClick }: { children: React.ReactNode, onClick?: React.MouseEventHandler }): JSX.Element {
    return (
        <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
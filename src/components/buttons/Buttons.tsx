import classNames from 'classnames';
import React from 'react';

const Button = ({ className, children, onClick }: { className?: string, children: React.ReactNode, onClick?: React.MouseEventHandler }): JSX.Element => {
    return (
        <button
            type="button"
            className={classNames(className, "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500")}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export const PrimaryButton = ({ className, children, onClick }: { className?: string, children: React.ReactNode, onClick?: React.MouseEventHandler }): JSX.Element => {
    return <Button className={classNames(className, 'text-white bg-indigo-600 hover:bg-indigo-700')} onClick={onClick}>
        {children}
    </Button>
};

export const SecondaryButton = ({ className, children, onClick }: { className?: string, children: React.ReactNode, onClick?: React.MouseEventHandler }): JSX.Element => {
    return <Button className={classNames(className, 'text-gray-700 bg-white hover:bg-gray-50')} onClick={onClick}>
        {children}
    </Button>
};

export const DangerButton = ({ className, children, onClick }: { className?: string, children: React.ReactNode, onClick?: React.MouseEventHandler }): JSX.Element => {
    return <Button className={classNames(className, 'text-white bg-red-600 hover:bg-red-700')} onClick={onClick}>
        {children}
    </Button>
};

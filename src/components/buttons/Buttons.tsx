import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

type ButtonProps = {
    className?: string,
    onClick?: React.MouseEventHandler,
    isLoading?: boolean,
};

const Button: FunctionComponent<ButtonProps> = ({ className, children, onClick, isLoading }): JSX.Element => {
    return (
        <button
            type='button'
            className={classNames(
                className,
                'inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                {
                    'cursor-not-allowed opacity-50': isLoading,
                }
            )}
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading && (
                <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
};

export const PrimaryButton: FunctionComponent<ButtonProps> = ({ className, children, onClick, isLoading = false }): JSX.Element => {
    return <Button className={classNames(className, 'text-white bg-indigo-600', { 'hover:bg-indigo-700': isLoading === false })} onClick={onClick} isLoading={isLoading}>
        {children}
    </Button>
};

export const SecondaryButton: FunctionComponent<ButtonProps> = ({ className, children, onClick, isLoading = false }): JSX.Element => {
    return <Button className={classNames(className, 'text-gray-700 bg-white hover:bg-gray-50')} onClick={onClick} isLoading={isLoading}>
        {children}
    </Button>
};

export const DangerButton: FunctionComponent<ButtonProps> = ({ className, children, onClick, isLoading = false }): JSX.Element => {
    return <Button className={classNames(className, 'text-white bg-red-600 hover:bg-red-700')} onClick={onClick} isLoading={isLoading}>
        {children}
    </Button>
};

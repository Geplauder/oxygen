import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames';
import React from 'react';
import { Placement } from 'tippy.js';

export default function Tooltip({ className = '', children, placement, content }: { className?: string, children: React.ReactNode, placement: Placement, content: React.ReactNode }): JSX.Element {
    return (
        <Tippy placement={placement} render={attrs => (
            <div className={classNames('bg-main-black text-white font-bold px-4 py-2 rounded-lg', { 'hidden': attrs['data-reference-hidden'] })} tabIndex={-1} {...attrs}>
                {content}
            </div>
        )}>
            <span className={className} tabIndex={0}>
                {children}
            </span>
        </Tippy>
    );
}
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames';
import React from 'react';
import { Placement } from 'tippy.js';

export default function Tooltip({ children, placement, content }: { children: React.ReactNode, placement: Placement, content: string }): JSX.Element {
    return (
        <Tippy placement={placement} render={attrs => (
            <div className={classNames('bg-[#18191D] text-white font-bold px-4 py-2 rounded-lg', { 'hidden': attrs['data-reference-hidden'] })} tabIndex={-1} {...attrs}>
                {content}
            </div>
        )}>
            <span tabIndex={0}>
                {children}
            </span>
        </Tippy>
    );
}
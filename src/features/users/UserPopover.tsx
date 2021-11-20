import { Popover } from '@headlessui/react';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import { User } from '../../types';

export default function UserPopover({ children, user, placement = 'right' }: { children: React.ReactNode, user: User, placement?: Placement }): JSX.Element {
    let [referenceElement, setReferenceElement] = useState();
    let [popperElement, setPopperElement] = useState();
    let { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 16]
                }
            }
        ]
    });

    return (
        <Popover>
            <Popover.Button className='w-full' ref={setReferenceElement as any}>{children}</Popover.Button>

            <Popover.Panel
                ref={setPopperElement as any}
                style={styles.popper}
                {...attributes.popper}
            >
                <div className="w-64 p-2 shadow-lg rounded-lg bg-main-black">
                    {user.username}
                </div>
            </Popover.Panel>
        </Popover>
    );
}
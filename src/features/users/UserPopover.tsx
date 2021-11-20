import { Popover } from '@headlessui/react';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import { User } from '../../types';
import UserAvatar from '../user/UserAvatar';

export default function UserPopover({ children, user, placement = 'right' }: { children: React.ReactNode, user: User, placement?: Placement }): JSX.Element {
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement>();
    const [popperElement, setPopperElement] = useState<HTMLDivElement>();
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 16],
                },
            },
        ],
    });

    return (
        <Popover>
            <Popover.Button className='w-full' ref={setReferenceElement as React.LegacyRef<HTMLButtonElement>}>{children}</Popover.Button>

            <Popover.Panel
                ref={setPopperElement as React.LegacyRef<HTMLDivElement>}
                style={styles.popper}
                {...attributes.popper}
            >
                <div className="my-2 w-48 p-2 inline-flex items-center shadow-lg rounded-lg bg-main-black">
                    <UserAvatar user={user} size='large' />
                    <div className='flex-1 text-white font-semibold text-center'>
                        <p>{user.username}</p>
                        <div className='flex flex-row-reverse text-indigo-500'>
                            {/* Badges */}
                        </div>
                    </div>
                </div>
            </Popover.Panel>
        </Popover>
    );
}
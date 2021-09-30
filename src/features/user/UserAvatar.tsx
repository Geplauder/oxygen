import classNames from 'classnames';
import React from 'react';
import Jdenticon from '../../components/Jdenticon';
import { User } from '../../types';

export default function UserAvatar({ className, user, size }: { className?: string, user: User, size: 'normal' | 'small' }): JSX.Element {
    return (
        <Jdenticon value={user.id} className={classNames(className, 'rounded-full', { 'w-12 h-12': size === 'normal', 'w-10 h-10': size === 'small' })} />
    );
}
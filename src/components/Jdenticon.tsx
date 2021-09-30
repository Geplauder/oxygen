import React, { useEffect, useRef } from 'react';
import { update } from 'jdenticon';

export default function Jdenticon({ className, value }: { className: string, value: string }): JSX.Element {
    const icon = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        update(icon.current as Element, value);
    }, [value]);

    return (
        <svg data-jdenticon-value={value} className={className} ref={icon} />
    );
}
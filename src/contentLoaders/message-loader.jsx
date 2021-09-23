import React from 'react';
import ContentLoader from 'react-content-loader';

const MessageLoader = (props) => (
    <ContentLoader
        speed={2}
        width={476}
        height={80}
        viewBox="0 0 476 80"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
        <rect x="48" y="22" rx="3" ry="3" width="410" height="6" />
        <rect x="48" y="34" rx="3" ry="3" width="380" height="6" />
        <rect x="48" y="46" rx="3" ry="3" width="178" height="6" />
        <circle cx="20" cy="20" r="20" />
    </ContentLoader>
);

export default MessageLoader;
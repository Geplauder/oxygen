import React from 'react';
import classNames from 'classnames';

const Servers = ({ servers, selectedServer, setSelectedServer }) => {
    return (
        <div className="flex flex-col items-center space-y-4 py-4 bg-servers w-20">
            {servers && servers.map((server, idx) => (
                <div key={idx} onClick={() => setSelectedServer(server)} className="cursor-pointer">
                    <img src="http://placekitten.com/256/256" className={classNames('w-16 h-16 rounded-full', { 'border-2': selectedServer?.id === server.id })} />
                </div>
            ))}
        </div>
    )
}

export default Servers;
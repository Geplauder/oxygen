import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Content from './components/content';
import Login from './components/login';
import Servers from './components/servers';
import { getAxios } from './utility/api';

const App = () => {
  const [user, setUser] = useState(null);
  const [servers, setServers] = useState(null);
  const [selectedServer, setSelectedServer] = useState(null);

  const bearerToken = useSelector((state) => state.auth.bearerToken);
  if (!bearerToken) {
    return <Login />;
  }

  useEffect(() => {
    const axios = getAxios(bearerToken);

    axios.get('users').then((x) => setUser(x.data));
    axios.get('users/servers')
      .then((x) => {
        setSelectedServer(x.data[0]);
        setServers(x.data);
      });
  }, []);

  return (
    <div>
      {user === null || servers === null ? (
        <div>Loading...</div>
      ) : (
        <div className="flex max-h-screen w-full">
          <Servers
            servers={servers}
            selectedServer={selectedServer}
            setSelectedServer={setSelectedServer}
          />
          <Content selectedServer={selectedServer} user={user} />
        </div>
      )}
    </div>
  );
};

export default App;

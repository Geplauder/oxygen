import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Content from './components/content';
import Login from './components/login';
import Servers from './components/servers';

const App = () => {
  const [user, setUser] = useState(null);
  const [servers, setServers] = useState(null);
  const [selectedServer, setSelectedServer] = useState(null);

  const bearerToken = useSelector(state => state.auth.bearerToken);
  if (!bearerToken) {
    return <Login />;
  }

  useEffect(() => {
    axios.get('http://localhost:8000/users', { headers: { authorization: `Bearer ${bearerToken}` } })
      .then(x => setUser(x.data));
    axios.get('http://localhost:8000/users/servers', { headers: { authorization: `Bearer ${bearerToken}` } })
      .then(x => {
        setSelectedServer(x.data[0]);
        setServers(x.data);
      });
  }, []);

  return (
    <div>
      {user === null || servers === null ? (
        <div>Loading...</div>
      ) : (
        <div className='flex h-screen w-full'>
          <Servers servers={servers} selectedServer={selectedServer} setSelectedServer={setSelectedServer} />
          <Content selectedServer={selectedServer} user={user} />
        </div>
      )}
    </div>
  );
};

export default App;

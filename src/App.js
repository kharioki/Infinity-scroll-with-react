import React, { useState, useEffect } from 'react';
// Components
import User from './User';
// Styles
import { Content, Loading } from './App.styles';
// API
import { getUsers } from './API';

function App() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const newUsers = await getUsers(page);
      setUsers(prev => [...prev, ...newUsers]); //merge previous and new users
      setLoading(false);
    }

    loadUsers(); // an async function
  }, [page]);

  return (
    <div className='App'>
      <Content>
        {users && users.map(user => <User key={user.cell} user={user} />)}
      </Content>
      {loading && <Loading>Loading ...</Loading>}
    </div>
  );
}

export default App;

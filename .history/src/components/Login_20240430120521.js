// YourReactComponent.js

import React, { useState, useEffect } from 'react';
import fetchAdminList from '../api/listingApi';
// import login from './loginapi';
// import fetchAdminList from './adminApi';

const YourReactComponent = () => {
  const [adminList, setAdminList] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          // If token is available, fetch admin list
          const responseData = await fetchAdminList(token);
          setAdminList(responseData);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

    // Clean-up function
    return () => {
      // Any clean-up code here if needed
    };
  }, [token]);

  const handleLogin = async (email, password) => {
    try {
      const token = await Lo(email, password);
      setToken(token); // Store the token
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleLogin('harjinder@gmail.com', '1234')}>Login</button>
      <ul>
        {adminList.map((admin) => (
          <li key={admin.id}>{admin.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default YourReactComponent;

import React, { useState } from 'react';
import login from '../api/loginApi';
import fetchAdminList from '../api/listingApi';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseData = await login(email, password);
      console.log(responseData); // Handle response data here
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleList = async()=>{
    try {
      const responseList = await fetchAdminList()
    } catch (error) {
      
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

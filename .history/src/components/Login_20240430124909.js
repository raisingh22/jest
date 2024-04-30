import React, { useState, useEffect } from "react";
import login from "../api/loginApi";
import fetchAdminList from "../api/listingApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const responseData = await login(email, password);
      const accessToken = responseData.data.accessToken;
      setToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
      console.log("Token:", accessToken); // Log the token value
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const handleList = async () => {
    try {
      const storedToken = localStorage.getItem("accessToken");
      console.log("Stored Token:", storedToken); // Log the stored token
      const responseList = await fetchAdminList(storedToken);
      console.log("Response List:", responseList.data); // Log the response data
      setAdminList(responseList.data);
    } catch (error) {
      console.error('Error fetching admin list:', error);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleList}>Get Admin List</button>
      <ul>
        {/* {adminList.map((admin, index) => (
          <li key={index}>{admin.name}</li> // Adjust the property according to your admin object structure
        ))} */}
      </ul>
    </div>
  );
};

export default Login;

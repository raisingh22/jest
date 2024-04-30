import React, { useState } from "react";
import login from "../api/loginApi";
import fetchAdminList from "../api/listingApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [adminList,setAdminList]= useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseData = await login(email, password);
      console.log(responseData.data.accessToken); // Handle response data here
      setToken(responseData.data.accessToken);

      localStorage.setItem("accessToken", token);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleList = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const responseList = await fetchAdminList(token);

      setAdminList(responseList.data)

      console.log(adminList);
    } catch (error) {}
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
<li>{}</li>
</ul>
    </div>
  );
};

export default Login;

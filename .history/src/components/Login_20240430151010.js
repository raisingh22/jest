import React, { useState, useEffect } from "react";
import login from "../api/loginApi";
import fetchAdminList from "../api/listingApi";
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      handleList();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const responseData = await login(email, password);
      const accessToken = responseData.data.accessToken;
      setToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
      console.log("Token:", accessToken); // Log the token value
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleList = async () => {
    setLoading(true);
    try {
      const storedToken = localStorage.getItem("accessToken");
      console.log("Stored Token:", storedToken); // Log the stored token
      const responseList = await fetchAdminList(storedToken);
      console.log("Response List:", responseList.data); // Log the response data
      if (Array.isArray(responseList.data.list)) {
        setAdminList(responseList.data.list);
      } else {
        console.error("Response data is not an array:", responseList.data.list);
      }
    } catch (error) {
      console.error("Error fetching admin list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {token && (
        <>
          <Header />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul class="p-0">
              {adminList.map((item) => (
                <div class="card m-3 ">
                  <div class="card-header">{item._id}</div>
                  <div class="card-body">
                    <blockquote class="blockquote mb-0">
                      <p class="text-xxl">{item.description}</p>
                      <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                      <p>
                        <strong>Updated At:</strong>{" "}
                        {new Date(item.updatedAt).toLocaleString()}
                      </p>

                      {/* <footer class="blockquote-footer">{item. createdAt}<cite title="Source Title">Source Title</cite></footer> */}
                    </blockquote>
                  </div>
                </div>
              ))}
            </ul>
          )}
          <div class="row m-2">
            <div class="col">
              <button type="button" class="btn btn-primary">
                Primary Left
              </button>
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-primary">
                Primary Right
              </button>
            </div>
          </div>
        </>
      )}
      {!token && (
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
          <button type="submit" disabled={loading}>
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;

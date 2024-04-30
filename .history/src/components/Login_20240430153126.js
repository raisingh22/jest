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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Number of items per page

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
  }, [token, currentPage]); // Re-fetch list when token or current page changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const responseData = await login(email, password);
      const accessToken = responseData.data.accessToken;
      setToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
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
      const responseList = await fetchAdminList(storedToken, currentPage, itemsPerPage);
      setAdminList(responseList.data.list);
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
            <ul className="p-0">
              {adminList.map((item) => (
                <div className="card m-3" key={item._id}>
                  <div className="card-header">{item._id}</div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p className="fs-5">{item.description}</p>
                      <p className="fs-6 fw-bold">
                        <strong>Created At:</strong>{" "}
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                      <p className="fs-6 fw-bold">
                        <strong>Updated At:</strong>{" "}
                        {new Date(item.updatedAt).toLocaleString()}
                      </p>
                    </blockquote>
                  </div>
                </div>
              ))}
            </ul>
          )}
          <div className="row m-2">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              >
                Next
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

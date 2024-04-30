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
  const [itemsPerPage] = useState(50); // Number of items per page

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
      const responseList = await fetchAdminList(
        storedToken,
        currentPage,
        itemsPerPage
      );
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-heart-eyes" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434z"/></svg>
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

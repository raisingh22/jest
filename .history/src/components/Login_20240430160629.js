import React, { useState, useEffect } from "react";
import login from "../api/loginApi";
import fetchAdminList from "../api/listingApi";
import updateJoke from "../api/updateJoke";
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // Number of items per page
  const [editingJokeId, setEditingJokeId] = useState(null);
  const [updatedJokeText, setUpdatedJokeText] = useState("");

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

  const handleJokeUpdate = async (jokeId,language) => {
    setLoading(true);
    try {
      const storedToken = localStorage.getItem("accessToken");
      // Here you should get the updated joke text from state
      await updateJoke(storedToken, jokeId, updatedJokeText);
      // After successfully updating the joke, refresh the admin list
      handleList();
      console.log(updatedJokeText);
    } catch (error) {
      console.error("Error updating joke:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (jokeId, jokeText) => {
    // When editing is initiated, set the editingJokeId and updatedJokeText state
    setEditingJokeId(jokeId);
    setUpdatedJokeText(jokeText);
  };

  const handleCancelEdit = () => {
    // When editing is canceled, reset the state
    setEditingJokeId(null);
    setUpdatedJokeText("");
  };

  return (
    <div>
      {token ? (
        <>
          <Header />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="p-0">
              {adminList.map((item) => (
                <div className="card m-3" key={item._id}>
                  <div className="card-header row d-flex ">
                    {editingJokeId === item._id ? (
                      <>
                        <input
                          type="text"
                          value={updatedJokeText}
                          onChange={(e) => setUpdatedJokeText(e.target.value)}
                        />
                        <button onClick={() => handleJokeUpdate(item._id)}>
                          Update
                        </button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        {item._id}
                        <div className="col-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                            onClick={() => handleEditClick(item._id, item.description)}
                            style={{ cursor: "pointer" }}
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                            />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
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
      ) : (
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

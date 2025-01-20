import React, { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import { DarkModeContext } from "../store/DarkModeContext";
import { useParams, useNavigate } from "react-router-dom";
import "./UserDetail.css";

const UserDetail = () => {
  const { users, fetchUsers, loading } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const user = users.find((user) => user.id === parseInt(id));

  useEffect(() => {
    fetchUsers();
  }, []);


    if (loading) return <div className={`loader-container ${darkMode ? 'dark' : 'light'}`}>
    <div className='spinner'></div>
  </div>;

  if (!user) return <div className={`error ${darkMode ? 'dark' : 'light'}`}>
    <img src='https://static.thenounproject.com/png/2247019-200.png' alt='error-img' />
    <p>User not found</p>
      </div>;

  return (
    <div className={`user-detail ${darkMode ? "dark" : "light"}`}>
      <div className={`details-card ${darkMode? 'dark-card' : null}`}>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Company: {user.company.name}</p>
        <p>Website: {user.website}</p>
      </div>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default UserDetail;
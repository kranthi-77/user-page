import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import { DarkModeContext } from "../store/DarkModeContext";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const { users, fetchUsers, loading, error } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) {
    return (
      <div className={`loader-container ${darkMode ? "dark" : "light"}`}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`error ${darkMode ? "dark" : "light"}`}>
        <img
          src="https://cdn.iconscout.com/icon/free/png-512/free-error-icon-download-in-svg-png-gif-file-formats--circle-the-best-icons-for-modern-web-pack-miscellaneous-460418.png?f=webp&w=512"
          alt="error"
        />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={`home ${darkMode ? "dark" : "light"}`}>
      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search users by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`search-bar ${darkMode ? "dark" : ""}`}
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={`sort-dropdown ${darkMode ? "dark" : ""}`}
          >
            <option value="asc">Sort A - Z</option>
            <option value="desc">Sort Z - A</option>
          </select>
        </div>
      </div>

      <ul className="user-list">
        {paginatedUsers.map((user) => (
          <li key={user.id} className={`user ${darkMode ? "dark-card" : ""}`}>
            <Link to={`/user/${user.id}`} className="link-item">
              <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
                <div className="user-city">{user.address.city}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={index + 1 === currentPage ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;

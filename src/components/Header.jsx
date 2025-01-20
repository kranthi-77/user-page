import React, { useContext } from "react";
import { DarkModeContext } from "../store/DarkModeContext";
import { BsMoonStars, BsMoonStarsFill } from "react-icons/bs";
import "./Header.css";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <header className={`header ${darkMode ? "dark" : "light"}`}>
      <h1>Users List</h1>
      <button className="toggle-button" onClick={toggleDarkMode}>
        {darkMode ? <BsMoonStars className="light-icon"/> : <BsMoonStarsFill className="dark-icon"/>}
      </button>
    </header>
  );
};

export default Header;
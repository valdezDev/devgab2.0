import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { GiCandleLight } from "react-icons/gi";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

const MenuBar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="green" className="menu-bar">
      <Menu.Item name={user.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
        <ul className="settings">
          <li className="settings__darkmode">
            <button
              aria-label="Darkmode on/off"
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              onKeyDown={() => setDarkMode(!darkMode)}
            >
              <GiCandleLight />
            </button>
          </li>
        </ul>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="green" className="menu-bar">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />

        <ul className="settings">
          <li className="settings__darkmode">
            <button
              data-testid="dark-mode-action"
              aria-label="Darkmode on/off"
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              onKeyDown={() => setDarkMode(!darkMode)}
            >
              <GiCandleLight />
            </button>
          </li>
        </ul>
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
};

export default MenuBar;

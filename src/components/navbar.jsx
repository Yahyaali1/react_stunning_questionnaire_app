import React from "react";
/**
 * @param {title}: renders title in nav bar
 */
const NavBar = ({ title }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand">{title}</a>
    </nav>
  );
};

export { NavBar };

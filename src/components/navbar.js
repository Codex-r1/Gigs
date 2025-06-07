import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
   <div>
  <nav className="navbar navbar-default navbar-sticky bootsnav">
    <div className="container">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target="#navbar-menu"
        >
          <i className="fa fa-bars" />
        </button>
        <Link className="navbar-brand" to="/">
          <img src="img/logo.png" className="logo" alt="Youth Skills" />
        </Link>
      </div>

      <div className="collapse navbar-collapse" id="navbar-menu">
        <ul
          className="nav navbar-nav navbar-right"
          data-in="fadeInDown"
          data-out="fadeOutUp"
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jobs">Find Jobs</Link>
          </li>
          <li>
            <Link to="/register">Create Profile</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>

  );
}

export default Navbar;

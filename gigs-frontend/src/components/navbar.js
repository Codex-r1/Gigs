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
              <img src="img/logo.png" className="logo" alt="" />
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
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/companies">Companies</Link>
              </li>
              <li className="dropdown">
                <Link to="/browse" className="dropdown-toggle" data-toggle="dropdown">
                  Browse
                </Link>
                <ul
                  className="dropdown-menu animated fadeInDown"
                  style={{ opacity: 1, display: "block" }}
                >
                  <li className="active">
                    <a href="browse-job.html">Browse Jobs</a>
                  </li>
                  <li>
                    <a href="company-detail.html">Job Detail</a>
                  </li>
                  <li>
                    <a href="resume.html">Resume Detail</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

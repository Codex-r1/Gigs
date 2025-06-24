import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // get stored role
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

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
              <img src="" className="logo" alt="Logo" />
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="navbar-menu">
            <ul
              className="nav navbar-nav navbar-right"
              data-in="fadeInDown"
              data-out="fadeOutUp"
            >
              <li><Link to="/">Home</Link></li>
              <li><Link to="/jobs">Find Jobs</Link></li>
              <li><Link to="/about">About Us</Link></li>

              {role === "employer" && (
                <>
                  <li><Link to="/jobpost">Post a Job</Link></li>
                  <li><Link to="/settings">Settings</Link></li>
                </>
              )}
              {role === "applicant" && (
                <>
                  <li><Link to="/settings">Settings</Link></li>
                </>
              )}
              {role === "admin" && (
                <>
                  <li><Link to="/settings">Settings</Link></li>
                </>
              )}

              {!isLoggedIn && <li><Link to="/login">Login</Link></li>}

              {isLoggedIn && (
                <li>
                  <button onClick={handleLogout} className="btn btn-danger navbar-btn">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        SHARED CALENDAR
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        {props.isAuthenticated && (
          <Fragment>
            <li className="nav-item">
              <Link to="/calendar" className="nav-link">
                Calendar
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
          </Fragment>
        )}
        {!props.isAuthenticated && (
          <Fragment>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);

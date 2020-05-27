import React, { Fragment } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer-row">
        <Link to="/">Home</Link>
        {props.isAuthenticated && (
          <Fragment>
            <Link to="/calendar">Calendar</Link>
            <Link to="/settings">Settings</Link>
          </Fragment>
        )}
      </div>
      <div className="footer-row">
        <Link to="/imprint">Imprint</Link>
        <Link to="/privacypolicy">Privacy Policy</Link>
      </div>
    </footer>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Footer);

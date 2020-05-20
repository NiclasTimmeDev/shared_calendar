import React, { Fragment, useState } from "react";
import validator from "validator";

//Routing:
import { Link, Redirect } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { login } from "./../../store/actions/auth";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const isEmail = validator.isEmail(formData.email);

    if (!isEmail || formData.password === "") {
      setFormData({
        ...formData,
        error: "Invalid credentials.",
      });
    }

    if (formData.error === "") {
      props.login(formData.email, formData.password);
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row full-height justify-content-center align-items-center">
          <div className="col-11 col-sm-7 col-md-4 primary-contrast-background rounded-edges">
            <h1 className="section-header">Login</h1>
            <form
              className="form-only"
              onSubmit={(e) => {
                submit(e);
              }}
            >
              <input
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="E-Mail"
                type="text"
                name="email"
                id="email"
                value={formData.email}
              />
              <small className="form-error">
                {formData.error === "" ? props.authError : formData.error}{" "}
              </small>
              <input
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                value={formData.password}
              />
              <small className="form-error">
                {formData.error === "" ? props.authError : formData.error}{" "}
              </small>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authError: state.auth.authError,
});

export default connect(mapStateToProps, { login })(Login);

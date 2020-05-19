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
    emailError: "",
    passwordError: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      emailError: "",
      passwordError: "",
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const isEmail = validator.isEmail(formData.email);
    if (!isEmail) {
      setFormData({
        ...formData,
        emailError: "Please enter a valid email address",
      });
    }
    if (formData.password === "") {
      setFormData({
        passwordError: "Please enter a password",
      });
    }
    if (formData.emailError === "" && formData.passwordError === "") {
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
              <small className="form-error">{formData.emailError} </small>
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
              <small className="form-error">{formData.passwordError} </small>
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
});

export default connect(mapStateToProps, { login })(Login);

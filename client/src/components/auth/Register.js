import React, { Fragment, useState } from "react";
import validator from "validator";

//Routing
import { Link, Redirect } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { register } from "./../../store/actions/auth";

const Register = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
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

    let formErrs = {
      username: "",
      email: "",
      password1: "",
      password2: "",
    };

    if (formData.username === "") {
      formErrs.username = "Please enter a username";
    }

    const isEmail = validator.isEmail(formData.email);
    if (!isEmail) {
      formErrs.email = "Please enter a valid email address.";
    }

    if (formData.password1 === "" || formData.password1.length < 6) {
      formErrs.password1 = "Please enter a password longer that 6 characters.";
    }

    if (formData.password1 !== formData.password2) {
      formErrs.password2 = "Please make sure that the two passwords match.";
    }

    setFormErrors({
      ...formErrors,
      username: formErrs.username,
      email: formErrs.email,
      password1: formErrs.password1,
      password2: formErrs.password2,
    });

    if (
      formErrors.username === "" &&
      formErrors.email === "" &&
      formErrors.password1 === "" &&
      formErrors.password2 === ""
    ) {
      props.register(formData.username, formData.email, formData.password1);
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
            <h1 className="section-header">Register</h1>
            <form
              className="form-only"
              onSubmit={(e) => {
                submit(e);
              }}
            >
              {/* USERNAME */}
              <input
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="Username"
                type="text"
                name="username"
                id="username"
                value={formData.username}
              />
              <small className="form-error">{formErrors.username}</small>
              {/* EMAIL */}
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
                {formErrors.email === "" ? props.authError : formErrors.email}{" "}
              </small>
              {/* PASSWORD 1 */}
              <input
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="Password"
                type="password"
                name="password1"
                id="password1"
                value={formData.password1}
              />
              <small className="form-error">{formErrors.password1}</small>
              {/* PASSWORD 2 */}
              <input
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="Repeat password"
                type="password"
                name="password2"
                id="password2"
                value={formData.password2}
              />
              <small className="form-error">{formErrors.password2}</small>
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

export default connect(mapStateToProps, { register })(Register);

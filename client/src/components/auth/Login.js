//3rd party:
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

  //change state on input field changes:
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  /*=================================
  submit form
  1. validate form inputs
  2. If validation fails, create error message
  3. Only if error message is empty, fire login function (which comes from redux)
  4. Redirect to calendar dashboard if user is authenticated
  =================================*/
  const submit = (e) => {
    e.preventDefault();
    //1:
    const isEmail = validator.isEmail(formData.email);

    //2:
    if (!isEmail || formData.password === "") {
      setFormData({
        ...formData,
        error: "Invalid credentials.",
      });
    }

    //3:
    if (formData.error === "") {
      props.login(formData.email, formData.password);
    }
  };

  //4:
  if (props.isAuthenticated) {
    return <Redirect to="/calendar" />;
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

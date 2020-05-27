//3rd party:
import React, { Fragment, useState } from "react";
import validator from "validator";

//Routing:
import { Link, Redirect } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { login } from "./../../store/actions/auth";

//components
import FormGroup from "./../../UI/FormElements/FormGroup";

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

  const submitLoginForm = (e) => {
    e.preventDefault();

    const isEmail = validator.isEmail(formData.email);

    if (isEmail && formData.password !== "") {
      props.login(formData.email, formData.password);
    } else {
      setFormData({
        ...formData,
        error: "Please enter a valid email address and a password.",
      });
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
                submitLoginForm(e);
              }}
            >
              <FormGroup
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="E-Mail"
                type="text"
                name="email"
                value={formData.email}
                error={formData.error !== "" || props.credentialsError !== ""}
                errorText={
                  formData.error === ""
                    ? props.credentialsError
                    : formData.error
                }
                description="Enter the e-mail address of your account"
              />
              <FormGroup
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                error={formData.error !== "" || props.credentialsError !== ""}
                errorText={
                  formData.error === ""
                    ? props.credentialsError
                    : formData.error
                }
                description="Enter your password"
              />
              <input type="submit" className="btn btn-primary" value="submit" />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  credentialsError: state.auth.credentialsError,
});

export default connect(mapStateToProps, { login })(Login);

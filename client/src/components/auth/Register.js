import React, { Fragment, useState } from "react";
import validator from "validator";

//Routing
import { Link, Redirect } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { register } from "./../../store/actions/auth";

//components
import FormGroup from "./../../UI/FormElements/FormGroup";

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

  //set state on input field changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  /*==================================
  register
  1. Create obj with possible errors
  2. Fill form errors, if an input isn't valid
  3. Set state with the error-obj. That way, the errors will be presented in the frontend
  4. Only if no errors are present, fire the register function (which comes from redux)
  5. Redirect to calendar dashboard if user is already logged in
  ==================================*/
  const submit = (e) => {
    e.preventDefault();

    //1:
    let formErrs = {
      username: "",
      email: "",
      password1: "",
      password2: "",
    };

    //2:
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

    //3:
    setFormErrors({
      ...formErrors,
      username: formErrs.username,
      email: formErrs.email,
      password1: formErrs.password1,
      password2: formErrs.password2,
    });

    //4:
    if (
      formErrors.username === "" &&
      formErrors.email === "" &&
      formErrors.password1 === "" &&
      formErrors.password2 === ""
    ) {
      props.register(formData.username, formData.email, formData.password1);
    }
  };

  //5:
  if (props.isAuthenticated) {
    return <Redirect to="/calendar" />;
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
              <FormGroup
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="Username..."
                type="text"
                name="username"
                value={formData.username}
                error={formErrors.username !== ""}
                errorText={formErrors.username}
                description="The name by which you will be called"
              />
              {/* EMAIL */}
              <FormGroup
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="Email..."
                type="text"
                name="email"
                value={formData.email}
                error={formErrors.email !== "" || props.credentialsError !== ""}
                errorText={
                  formErrors.email !== ""
                    ? formErrors.email
                    : props.credentialsError
                }
                description="Your email address"
              />
              {/* PASSWORD 1 */}
              <FormGroup
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="Password..."
                type="password"
                name="password1"
                value={formData.password1}
                error={formErrors.password1}
                errorText={formErrors.password1}
                description="Your password"
              />
              {/* PASSWORD 2 */}
              <FormGroup
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="Password..."
                type="password"
                name="password2"
                value={formData.password2}
                error={formErrors.password2}
                errorText={formErrors.password2}
                description="Your password"
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

export default connect(mapStateToProps, { register })(Register);

import React, { Fragment, useState } from "react";
import validator from "validator";

//redux
import { connect } from "react-redux";
import { createCalendar } from "./../../store/actions/calendar";

const CreateCalendar = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setFormErrors({
      ...formErrors,
      title: "",
      email: "",
    });
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const checkEmailInput = () => {
    return formData.email === "" ? true : validator.isEmail(formData.email);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    let titleError = "";
    let emailError = "";

    const isEmailInputValid = checkEmailInput();

    if (!isEmailInputValid) {
      emailError = "Please enter a valid email address";
    }
    if (formData.title === "") {
      titleError = "Please enter a title";
    }

    setFormErrors({
      ...formErrors,
      title: titleError,
      email: emailError,
    });

    if (formData.title !== "" && isEmailInputValid) {
      props.createCalendar(formData.title);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center align-items-center full-height">
          <div className="col-sm-7 col-md-5">
            <h2 className="section-header">Create a calendar</h2>
            <p className="leading">
              Seems like you are not am member of a calendar yet. So why don't
              you create one?
            </p>
            <form
              className="form-only"
              onSubmit={(e) => {
                onSubmitForm(e);
              }}
            >
              <input
                type="text"
                name="title"
                className={
                  formErrors.title === ""
                    ? "no-gutter"
                    : "no-gutter input-error"
                }
                placeholder="Title..."
                value={formData.title}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <span className="small">Give your calendar a cool name</span>
              {formErrors.title !== "" && (
                <span className="form-error form-error-small">
                  {formErrors.title}
                </span>
              )}
              <input
                type="text"
                name="email"
                placeholder="Invite someone by mail..."
                className={
                  formErrors.email === ""
                    ? "no-gutter"
                    : "no-gutter input-error"
                }
                value={formData.email}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <span className="small">
                Enter the email of the person you want to share a calendar with.
                We will send him/her an email.
              </span>
              {formErrors.email !== "" && (
                <span className="form-error form-error-small">
                  {formErrors.email}
                </span>
              )}
              <input
                type="submit"
                name="submit"
                className="btn btn-primary"
                value="Create calendar"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

// const mapStateToProps = state =>({

// })

export default connect(null, { createCalendar })(CreateCalendar);

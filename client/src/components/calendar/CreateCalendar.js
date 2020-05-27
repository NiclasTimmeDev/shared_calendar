import React, { Fragment, useState } from "react";
import validator from "validator";

//redux
import { connect } from "react-redux";
import { createCalendar } from "./../../store/actions/calendar";

//components
import FormGroup from "./../../UI/FormElements/FormGroup";

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
              <FormGroup
                type="text"
                name="title"
                placeholder="Title..."
                description="Give your calendar a cool name"
                error={formErrors.title !== ""}
                errorText={formErrors.title}
                value={formData.title}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <FormGroup
                type="text"
                name="email"
                placeholder="Invite someone by mail..."
                description="Enter the email of the person you want to share a calendar with.
                We will send him/her an email."
                error={formErrors.email !== ""}
                errorText={formErrors.email}
                value={formData.email}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
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

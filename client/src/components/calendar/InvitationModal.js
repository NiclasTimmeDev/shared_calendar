import React, { Fragment, useState } from "react";
import validator from "validator";

//redux
import { connect } from "react-redux";
import { hideInvitationModal } from "./../../store/actions/calendar";
import { sendCalendarInvitation } from "./../../store/actions/calendar";

//components
import FormGroup from "./../../UI/FormElements/FormGroup";
import Backdrop from "./../../UI/Backdrop/Backdrop";

const InvitationModal = (props) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    setFormErrors({
      ...formErrors,
      email: "",
    });

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = validator.isEmail(formData.email);

    if (!isEmailValid) {
      setFormErrors({
        ...formErrors,
        email: "Please enter a valid email address",
      });
    } else if (formData.email === props.user.email) {
      setFormErrors({
        ...formErrors,
        email: "You can't invite yourself.",
      });
    } else {
      props.sendCalendarInvitation(formData.email);
    }
  };

  return (
    props.showInvitationModal && (
      <Fragment>
        <Backdrop click={props.hideInvitationModal} />
        <div className="container light-box">
          <div className="row justify-content-center align-items-center full-height">
            <div className="col-5 light-box-card">
              <h2>Invite someone</h2>
              <p className="form-lead">
                Leverage the full power of shared Calendar by inviting someone
                by mail.
              </p>
              <form
                onSubmit={(e) => {
                  onFormSubmit(e);
                }}
              >
                <FormGroup
                  type="text"
                  name="email"
                  placeholder="Email..."
                  description="Invite someone by mail"
                  error={formErrors.email !== ""}
                  errorText={formErrors.email}
                  value={formData.email}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                <input type="submit" value="send" className="btn btn-primary" />
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  showInvitationModal: state.calendar.showInvitationModal,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  hideInvitationModal,
  sendCalendarInvitation,
})(InvitationModal);

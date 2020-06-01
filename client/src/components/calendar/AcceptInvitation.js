import React, { useEffect, Fragment } from "react";

//Routing
import { Link, Redirect } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { acceptInvitation } from "./../../store/actions/calendar";

const AcceptInvitation = (props) => {
  localStorage.setItem("invitation", props.match.params.token);

  const contentNotAuthenticated = (
    <Fragment>
      <p className="leading">
        You must <Link to="/login">log in</Link> or{" "}
        <Link to="/register">register</Link> to accept the invitation
      </p>
    </Fragment>
  );

  const contentToDisplay = (() => {
    if (!props.isAuthenticated) {
      return contentNotAuthenticated;
    } else if (props.isAuthenticated) {
      return (
        <button
          onClick={() => {
            acceptInvitation();
          }}
          className="btn btn-primary"
        >
          Accept
        </button>
      );
    }
  })();

  const acceptInvitation = () => {
    console.log("okay");
    props.acceptInvitation();
  };

  if (
    !props.calendarLoading &&
    props.calendarID !== "" &&
    props.isAuthenticated
  ) {
    return <Redirect to="/calendar" />;
  } else {
    return (
      <Fragment>
        <div className="container">
          <div className="row justify-content-center align-items-center full-height">
            <div className="col-sm-7 col-md-6">
              <h2 className="section-header">You received an invitation!</h2>
              {contentToDisplay}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  calendarLoading: state.calendar.loading,
  calendarID: state.calendar.calendarID,
});

export default connect(mapStateToProps, { acceptInvitation })(AcceptInvitation);

import React, { Fragment, useState, useEffect } from "react";

//redux
import { connect } from "react-redux";
import { loadCalendar } from "../../store/actions/calendar";

//components
import ChooseMonth from "./ChooseMonth";

//Routing
import { Redirect, Link } from "react-router-dom";

const CalendarDashboard = (props) => {
  useEffect(() => {
    props.loadCalendar();
  }, [props.isAuthenticated]);

  if (props.authLoading) {
    return <div>Loading...</div>;
  } else {
    if (!props.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              <ChooseMonth />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

const mapStateToProps = (state) => ({
  members: state.calendar.members,
  events: state.calendar.events,
  loading: state.calendar.loading,
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.loading,
});

export default connect(mapStateToProps, { loadCalendar })(CalendarDashboard);

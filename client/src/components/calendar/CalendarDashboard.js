import React, { Fragment, useState, useEffect } from "react";

//redux
import { connect } from "react-redux";
import { loadCalendar } from "../../store/actions/calendar";
import { createNewEvent } from "./../../store/actions/calendarEvent";

//components
import ChooseMonth from "./ChooseMonth";
import CalendarGrid from "./CalendarGrid";

//Routing
import { Redirect } from "react-router-dom";

const CalendarDashboard = (props) => {
  //loads calendar into redux when state switches to authenticated
  useEffect(() => {
    if (props.isAuthenticated) {
      props.loadCalendar();
    }
  }, [props.isAuthenticated]);

  //If loading the user is not yet finished (which is done in App.js whenever a view gets rendered), show loading symbol
  if (props.authLoading) {
    return <div>Loading...</div>;
  } else {
    //If loading is done but user is not authenticated, redirect to /login
    if (!props.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              <button
                onClick={() => {
                  props.createNewEvent();
                }}
                className="btn btn-primary"
              >
                new event
              </button>
              <ChooseMonth />
            </div>
            <div className="col-sm-9">
              <div className="container-fluid">
                <div className="row calendar-grid justify-content-center">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <h2>
                            {/* Show full month and full year */}
                            {props.date.toLocaleString("en-US", {
                              month: "long",
                            })}{" "}
                            {props.date.getFullYear()}
                          </h2>
                        </th>
                        {/* For every member of the calendar, create one table-head element. */}
                        {props.members.map((member, i) => {
                          return (
                            <th key={i}>
                              <h3>{member.username}</h3>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <CalendarGrid />
                    </tbody>
                  </table>
                </div>
              </div>
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
  date: state.calendar.date,
});

export default connect(mapStateToProps, { loadCalendar, createNewEvent })(
  CalendarDashboard
);

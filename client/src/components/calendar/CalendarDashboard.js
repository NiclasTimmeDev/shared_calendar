import React, { Fragment, useState, useEffect } from "react";

//redux
import { connect } from "react-redux";
import { loadCalendar } from "../../store/actions/calendar";
import { createNewEvent } from "./../../store/actions/calendarEvent";
import { openInvitationModal } from "./../../store/actions/calendar";

//components
import ChooseMonth from "./ChooseMonth";
import CalendarGrid from "./CalendarGrid";
import CreateCalendar from "./CreateCalendar";

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
  if (props.authLoading || props.calendarLoading) {
    return <div>Loading...</div>;
  } else {
    //If loading is done but user is not authenticated, redirect to '/login'
    if (!props.calendarLoading && props.members.length === 0) {
      return <CreateCalendar />;
    } else if (!props.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    //Start the process of inviting someone to the calendar
    const showInvitationModal = () => {
      props.openInvitationModal();
    };

    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              {/* Button to create new event: */}
              <button
                onClick={() => {
                  props.createNewEvent();
                }}
                className="btn btn-primary"
              >
                new event
              </button>
              {/* Choose month component: */}
              <ChooseMonth />
            </div>
            <div
              className={props.members.length === 1 ? "col-sm-7" : "col-sm-9"}
            >
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
                      {/* Show calendar grid component on the right side of the screen: */}
                      <CalendarGrid />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {props.members.length === 1 && (
              <div className="col-sm-2">
                <button
                  onClick={showInvitationModal}
                  className="btn btn-secondary"
                >
                  Invite someone!
                </button>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
};

const mapStateToProps = (state) => ({
  members: state.calendar.members,
  events: state.calendar.events,
  calendarLoading: state.calendar.loading,
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.loading,
  date: state.calendar.date,
  showInvitationModal: state.calendar.showInvitationModal,
});

export default connect(mapStateToProps, {
  loadCalendar,
  createNewEvent,
  openInvitationModal,
})(CalendarDashboard);

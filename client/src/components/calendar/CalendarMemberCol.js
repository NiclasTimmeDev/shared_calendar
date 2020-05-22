import React from "react";

//redux
import { connect } from "react-redux";

const CalendarMemberCol = (props) => {
  const cols = props.monthDates.map((day, i) => {
    return (
      <div className="row calendar-grid">
        <div className="col">INSER EVENT HERE</div>
      </div>
    );
  });

  return cols;
};

const mapStateToProps = (state) => ({
  members: state.calendar.members,
  date: state.calendar.date,
  calendarID: state.calendar.calendarID,
  events: state.calendar.events,
  monthDates: state.calendar.monthDates,
});

export default connect(mapStateToProps)(CalendarMemberCol);

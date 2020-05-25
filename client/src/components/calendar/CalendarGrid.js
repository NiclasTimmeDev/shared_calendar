import React, { Fragment } from "react";
import moment from "moment";

//redux
import { connect } from "react-redux";
import { loadMonthDates } from "./../../store/actions/calendar";
import { loadEvents } from "./../../store/actions/calendar";
import { updateEvent } from "./../../store/actions/calendarEvent";
import { setCurrentEvent } from "./../../store/actions/calendarEvent";

//Components
import EventDashboardItem from "./../calendarEvent/EventDashboardItem";
import UpdateEvent from "./../calendarEvent/UpdateEvent";

const CalendarGrid = (props) => {
  /*======================================
  get all weekdays of the date that is stored in state.calendar (redux)
  returns an array of moment objects that (amongst other unimportant stuff) returns a ._d property,
  which stores a string with the date info.
  ======================================*/
  const currentMonthDates = new Array(
    moment([props.date.getFullYear(), props.date.getMonth()]).daysInMonth()
  )
    .fill(null)
    .map((x, i) =>
      moment([props.date.getFullYear(), props.date.getMonth()])
        .startOf("month")
        .add(i, "days")
    );

  /*====================================
    Bring the above currentMonthDates Array into a more useful format
    1. The above array hold objs with the ._d property, which is a Date() obj
    2. Map over the array
    3. Depending on the day (0=sunday, 6=Saturday)
    4. Create new array that holds the number of the day in the month, the month and the year
    =====================================*/
  const currentMonthDaysFullLength = currentMonthDates.map((month, i) => {
    //3:
    switch (month._d.getDay()) {
      case 1:
        return {
          //4:
          number: i + 1,
          day: "Monday",
          year: month._d.getFullYear(),
          month: month._d.getMonth(),
        };
      case 2:
        return {
          number: i + 1,
          day: "Tuesday",
          year: month._d.getFullYear(),
          month: month._d.getMonth(),
        };
      case 3:
        return {
          number: i + 1,
          day: "Wednesday",
          year: month._d.getFullYear(),
          month: month._d.getMonth(),
        };
      case 4:
        return {
          number: i + 1,
          day: "Thursday",
          year: month._d.getFullYear(),
          month: month._d.getMonth(),
        };
      case 5:
        return {
          number: i + 1,
          day: "Friday",
          year: month._d.getFullYear(),
          month: month._d.getMonth(),
        };
      case 6:
        return {
          number: i + 1,
          day: "Saturday",
          year: month._d.getFullYear(),
          month: month._d.getMonth(),
        };
      case 0:
        return {
          number: i + 1,
          day: "Sunday",
          year: month._d.getFullYear(),
          month: month._d.getMonth(),
        };
      default:
        return;
    }
  });

  //store currentMonthDaysFullLength in redux, so other elements can later access the detailed info of the selected month
  props.loadMonthDates(currentMonthDaysFullLength);

  //Return a HTML-tr element for each entry of currentMonthDaysFullLength
  const grid = currentMonthDaysFullLength.map((day, i) => {
    const today = new Date();
    return (
      <Fragment>
        <tr key={i}>
          <td
            className={
              today.getFullYear() === day.year &&
              today.getMonth() === day.month &&
              today.getDate() === day.number
                ? "selected-text"
                : null
            }
          >
            <h3>{day.number}</h3>
            <sup>
              <small>{day.day}</small>
            </sup>
          </td>
          {/* For every member, create a new td element (like a new .col element) */}
          {props.members.map((member, i) => {
            return (
              <td key={i}>
                {/*=======================
                Map events from redux to the right td's in the table grid
                1. Map over all events
                2. The date property of an event is a string. Therefore, create a new date obj that takes that string as an argument
                3. If the event belongs to the member and has the same year, month and day as the given table cell, display an EventDashboardItem Component in it.
                =======================*/}
                {/* 1: */}
                {props.events.map((event, i) => {
                  // 2:
                  const dateObj = new Date(event.date);

                  //3:
                  if (
                    event.to.toString() === member.userID.toString() &&
                    dateObj.getFullYear() === day.year &&
                    dateObj.getMonth() === day.month &&
                    dateObj.getDate() === day.number
                  ) {
                    return (
                      <div key={i}>
                        <EventDashboardItem
                          clickEditIcon={() => {
                            props.setCurrentEvent(event);
                            props.updateEvent();
                          }}
                          title={event.title}
                        />
                      </div>
                    );
                  }
                })}
              </td>
            );
          })}
        </tr>
      </Fragment>
    );
  });
  return (
    <Fragment>
      {props.showUpdateEvent && <UpdateEvent />}
      {grid}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  date: state.calendar.date,
  events: state.calendar.events,
  members: state.calendar.members,
  showUpdateEvent: state.calendarEvent.updateEvent,
});
export default connect(mapStateToProps, {
  loadMonthDates,
  loadEvents,
  updateEvent,
  setCurrentEvent,
})(CalendarGrid);

import React, { Fragment } from "react";
import moment from "moment";

//redux
import { connect } from "react-redux";
import { loadMonthDates } from "./../../store/actions/calendar";
import { loadEvents } from "./../../store/actions/calendar";

const CalendarGrid = (props) => {
  //get all weekdays of the date that is stored in redux:
  //returns an array of moment objects that (amongst other unimportant stuff) returns a .d property. which stores a string with the date info
  const currentMonthDates = new Array(
    moment([props.date.getFullYear(), props.date.getMonth()]).daysInMonth()
  )
    .fill(null)
    .map((x, i) =>
      moment([props.date.getFullYear(), props.date.getMonth()])
        .startOf("month")
        .add(i, "days")
    );

  //the above array holds objs with the ".d" property. This one holds the important date info. The first three characters of the value of ".d" hold the weekday info
  //This one is extracted here and mapped into a new array
  const currentMonthDaysFullLength = currentMonthDates.map((month, i) => {
    switch (month._d.toString().substring(0, 3)) {
      case "Mon":
        return { number: i + 1, day: "Monday" };
      case "Tue":
        return { number: i + 1, day: "Tuesday" };
      case "Wed":
        return { number: i + 1, day: "Wednesday" };
      case "Thu":
        return { number: i + 1, day: "Thursday" };
      case "Fri":
        return { number: i + 1, day: "Friday" };
      case "Sat":
        return { number: i + 1, day: "Saturday" };
      case "Sun":
        return { number: i + 1, day: "Sunday" };
      default:
        return;
    }
  });

  //store currentMonthDaysFullLength in redux, so other elements can later access the detailed info of the selected month
  props.loadMonthDates(currentMonthDaysFullLength);

  //Return a HTML-tr element for each entry of currentMonthDaysFullLength
  const grid = currentMonthDaysFullLength.map((day, i) => {
    return (
      <Fragment>
        <tr key={i}>
          <td>
            <h3>{day.number}</h3>
            <sup>
              <small>{day.day}</small>
            </sup>
          </td>
          {props.members.map((member) => {
            return (
              <td>
                {props.events.map((event) => {
                  if (event.to.toString() === member.userID.toString()) {
                    return <div>{event.start}</div>;
                  }
                })}
              </td>
            );
          })}
        </tr>
      </Fragment>
    );
  });

  return grid;
};
const mapStateToProps = (state) => ({
  date: state.calendar.date,
  events: state.calendar.events,
  members: state.calendar.members,
});
export default connect(mapStateToProps, { loadMonthDates, loadEvents })(
  CalendarGrid
);
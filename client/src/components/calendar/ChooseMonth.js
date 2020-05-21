import React, { Fragment, useState } from "react";

//redux
import { connect } from "react-redux";
import { setDate } from "./../../store/actions/calendar";

const ChooseMonth = (props) => {
  //actual Date:
  const actualDate = new Date();

  //currently selected month by user
  const activeMonth = props.date.toLocaleString("en-US", { month: "long" });

  //The year that will be displayed at the top:
  const [year, setYear] = useState(props.date.getFullYear());

  //All months of a year. Will be used to display all remaining months of the selected year:
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //Check how many months of the year remain
  //If year> the actual year, all months must be displayed
  //If the year is the actual year, only show actual month - december
  let remainingMonthOfTheYear = [];
  if (year > actualDate.getFullYear()) {
    remainingMonthOfTheYear = months;
  } else if (year === actualDate.getFullYear())
    for (let i = actualDate.getMonth(); i < months.length; i++) {
      remainingMonthOfTheYear.push(months[i]);
    }

  //For each remaining month, create a row element
  //Also, when clicking, set the date in redux to the selected date (month 1, year ,0 o'clock)
  const monthOptions = remainingMonthOfTheYear.map((option, i) => {
    return (
      <div
        className={activeMonth === option ? "row selected" : "row"}
        key={i}
        onClick={() => {
          props.setDate(new Date(`${option} 1, ${year} 24:00:00`));
        }}
      >
        {option}
      </div>
    );
  });

  const incrementYear = () => {
    setYear(year + 1);
  };
  const decrementYear = () => {
    setYear(year - 1);
  };

  return (
    <Fragment>
      <div className="container-fluid no-gutters">
        <div className="row">
          {/* Only show arrow to left when selected year is larger than actual year */}
          {actualDate.getFullYear() != year && (
            <i
              onClick={() => {
                decrementYear();
              }}
              class="fas fa-chevron-left"
            ></i>
          )}{" "}
          {year}{" "}
          <i
            onClick={() => {
              incrementYear();
            }}
            class="fas fa-chevron-right"
          ></i>
        </div>

        {monthOptions}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  date: state.calendar.date,
});

export default connect(mapStateToProps, { setDate })(ChooseMonth);

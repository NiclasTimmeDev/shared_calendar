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

  /*=============================
  Check how many month of the year remain
  1. If year > the actual year, all months must be displayed
  2. If the year is the actual year, only show actual month - december
  =============================*/
  let remainingMonthOfTheYear = [];
  //1:
  if (year > actualDate.getFullYear()) {
    remainingMonthOfTheYear = months;
  }
  //2:
  else if (year === actualDate.getFullYear())
    for (let i = actualDate.getMonth(); i < months.length; i++) {
      remainingMonthOfTheYear.push(months[i]);
    }

  /*==========================
    Create row element for each remaining month of the year
    1. Create row element
    2. If the remaining month of the year is also the selected one, add another class "selected-text"
    3. Onclick, call function from redux that changes the date in redux to the first day of the selected month
    ==========================*/
  //For each remaining month, create a row element
  //Also, when clicking, set the date in redux to the selected date (month 1, year ,0 o'clock)
  const monthOptions = remainingMonthOfTheYear.map((option, i) => {
    return (
      // 1:
      <div
        className={
          //2:
          activeMonth === option && year === props.date.getFullYear()
            ? "row selection-list-item selected-text"
            : "row selection-list-item"
        }
        key={i}
        // 3:
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
      <div className="container-fluid no-gutters choose-month">
        <div className="row align-items-center">
          {/* Only show arrow to left when selected year is larger than actual year */}
          {actualDate.getFullYear() != year && (
            <i
              onClick={() => {
                decrementYear();
              }}
              className="fas fa-chevron-left icon-large"
            ></i>
          )}{" "}
          <h2 className="subheader">{year}</h2>{" "}
          <i
            onClick={() => {
              incrementYear();
            }}
            className="fas fa-chevron-right icon-large"
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

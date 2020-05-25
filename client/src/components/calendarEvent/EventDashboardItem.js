import React, { Fragment } from "react";

const EventDashboardItem = (props) => {
  const possibleBackgroundColors = [
    "#e5a4cb",
    "#F93943",
    "#5DB7DE",
    "#FFD972",
    "#14FFF7",
    "#D8F793",
    "#EAFFDA",
    "#23CE6B",
    "#2E294E",
    "#A23B72",
  ];

  const randomInt = Math.floor(Math.random() * 10);
  return (
    <div
      className="event-db-item"
      style={{ backgroundColor: possibleBackgroundColors[randomInt] }}
      onClick={props.clickWrapper}
    >
      <span className="event-db-item-title">{props.title}</span>
      <i
        className="fas fa-edit  event-db-item-icon"
        onClick={props.clickEditIcon}
      ></i>
    </div>
  );
};

export default EventDashboardItem;

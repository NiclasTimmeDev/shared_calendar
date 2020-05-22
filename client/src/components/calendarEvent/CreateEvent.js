import React from "react";

//redux
import { connect } from "react-redux";
import { createNewEvent } from "./../../store/actions/calendarEvent";

const CreateEvent = (props) => {
  {
    if (props.createEvent) {
      return <div>Hello</div>;
    } else {
      return null;
    }
  }
};

const mapStateToProps = (state) => ({
  createEvent: state.calendarEvent.createEvent,
});

export default connect(mapStateToProps, { createNewEvent })(CreateEvent);

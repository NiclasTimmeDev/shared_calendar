import React, { Fragment, useState } from "react";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

//redux
import { connect } from "react-redux";
import {
  submitUpdatedEvent,
  interruptUpdatingAnEvent,
} from "./../../store/actions/calendarEvent";

//components
import Backdrop from "./../../UI/Backdrop/Backdrop";

const UpdateEvent = (props) => {
  const [formData, setFormData] = useState({
    title: props.title,
    date: new Date(props.date),
    start: new Date(props.start),
    end: new Date(props.end),
    isWholeDay: props.isWholeDay,
    allocatedToYourself: props.user._id.toString() === props.to,
    notes: props.notes,
    calendarEventID: props.calendarEventID,
  });

  const [formErrors, setFormErrors] = useState({ title: false });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleStartTimeChange = (time) => {
    const newStart = new Date(`January 1, 1970 ${time}:00`);
    setFormData({
      ...formData,
      start: newStart,
    });
    console.log(formData);
  };
  const handleEndTimeChange = (time) => {
    const newEnd = new Date(`January 1, 1970 ${time}:00`);
    setFormData({
      ...formData,
      end: newEnd,
    });
  };

  const handleCheckBoxChange = (e) => {
    setFormData({
      ...formData,
      allocatedToYourself: !formData.allocatedToYourself,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //1.
    const {
      title,
      date,
      start,
      end,
      isWholeDay,
      notes,
      calendarEventID,
    } = formData;

    //3:
    let to;
    if (formData.allocatedToYourself) {
      to = props.user._id;
    } else {
      const otherUser = props.calendar.members.filter((member) => {
        return member.userID.toString() !== props.user._id.toString();
      });
      to = otherUser[0].userID;
    }

    if (title !== "") {
      setFormErrors({
        ...formErrors,
        title: false,
      });

      props.submitUpdatedEvent({
        title,
        date,
        start,
        end,
        isWholeDay,
        to,
        notes,
        calendarEventID,
      });
    }
    //4:
    else {
      setFormErrors({
        ...formErrors,
        title: true,
      });
    }
  };

  if (props.updateEvent) {
    return (
      <Fragment>
        <Backdrop
          click={() => {
            props.interruptUpdatingAnEvent();
          }}
        />
        <div className="container light-box">
          <div className="row justify-content-center align-items-center full-height">
            <div className="col-5 light-box-card">
              <form
                onSubmit={(e) => {
                  onSubmit(e);
                }}
              >
                {/* title */}
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Add title..."
                  value={formData.title}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className={
                    formErrors.title ? "form-field input-error" : "form-field"
                  }
                />

                <div className="form-field">
                  <i className="fas fa-calendar-alt icon-xlarge"></i>
                  {/* 3rd party component */}
                  <DatePicker
                    onChange={handleDateChange}
                    value={formData.date}
                    calendarIcon={null}
                    autoFocus={false}
                    clearIcon={false}
                    className="date-picker-form"
                    name="start"
                  />
                </div>
                <div className="inline-children form-field">
                  <i className="fas fa-clock icon-xlarge"></i>
                  {/* 3rd party component */}
                  <TimePicker
                    onChange={handleStartTimeChange}
                    maxDetail="minute"
                    value={formData.start}
                    autoFocus={false}
                    clearIcon={null}
                    className="time-picker-form"
                    clockIcon={null}
                    amPmAriaLabel="am/pm"
                  />
                  <span className="explanation-text form-explanation"> - </span>
                  {/* 3rd party component */}
                  <TimePicker
                    onChange={handleEndTimeChange}
                    maxDetail="minute"
                    value={formData.end}
                    autoFocus={false}
                    clearIcon={null}
                    className="time-picker-form time-picker-end"
                    clockIcon={null}
                    amPmAriaLabel="am/pm"
                  />
                </div>
                <div className="inline-children form-field">
                  <i className="fas fa-user icon-xlarge"></i>
                  {/* checkbox */}
                  <input
                    type="checkbox"
                    name="allocatedToYourself"
                    defaultChecked={formData.allocatedToYourself}
                    id="allocatedToYourself"
                    className="checkbox"
                    value={formData.allocatedToYourself}
                    onChange={(e) => {
                      handleCheckBoxChange(e);
                    }}
                  />
                  <span className="explanation-text form-explanation">
                    Allocate to yourself
                  </span>
                </div>
                <div className="inline-children form-field">
                  <i className="fas fa-align-left icon-xlarge"></i>
                  {/* Notes */}
                  <input
                    type="text"
                    name="notes"
                    id="notes"
                    placeholder="Add a note..."
                    value={formData.notes}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                </div>
                {/* submit button */}
                <input type="submit" className="btn btn-primary" value="save" />
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  updateEvent: state.calendarEvent.updateEvent,
  calendarEventID: state.calendarEvent.currentEvent._id,
  title: state.calendarEvent.currentEvent.title,
  date: state.calendarEvent.currentEvent.date,
  start: state.calendarEvent.currentEvent.start,
  end: state.calendarEvent.currentEvent.end,
  isWholeDay: state.calendarEvent.currentEvent.isWholeDay,
  to: state.calendarEvent.currentEvent.to,
  notes: state.calendarEvent.currentEvent.notes,
  calendar: state.calendar,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  submitUpdatedEvent,
  interruptUpdatingAnEvent,
})(UpdateEvent);

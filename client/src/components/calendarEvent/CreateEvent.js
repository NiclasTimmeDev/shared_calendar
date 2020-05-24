import React, { Fragment, useState } from "react";
import moment from "moment";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

//redux
import { connect } from "react-redux";
import {
  createNewEvent,
  interruptEventCreation,
  submitNewEvent,
} from "./../../store/actions/calendarEvent";

//components
import Backdrop from "./../../UI/Backdrop/Backdrop";

const CreateEvent = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    date: new Date(),
    start: new Date(),
    end: new Date(),
    isWholeDay: false,
    allocatedToYourself: true,
    notes: "",
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
    console.log(formData.date);
  };

  const handleStartTimeChange = (time) => {
    setFormData({
      ...formData,
      start: time,
    });
  };
  const handleEndTimeChange = (time) => {
    setFormData({
      ...formData,
      end: time,
    });
  };

  const handleCheckBoxChange = (e) => {
    setFormData({
      ...formData,
      allocatedToYourself: !formData.allocatedToYourself,
    });
  };

  /*==========================================
  Submit the form to create a new event
  1. destructure formData
  2. "from" is the creator, i.e the logged in user
  3. "isAllcoatedToYou" in formData is false it means, that the event is allocated to the other member of the calendar
  In that case, filter the members array from calendar state in redux for the other user an set "to" to his/her userID
  4. Show error if no title is provied

  ==========================================*/
  const onSubmit = (e) => {
    e.preventDefault();

    //1.
    const { title, date, start, end, isWholeDay, notes } = formData;

    //2:
    const from = props.user._id;

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

      props.submitNewEvent(
        title,
        date,
        start,
        end,
        isWholeDay,
        from,
        to,
        notes
      );
    }
    //4:
    else {
      setFormErrors({
        ...formErrors,
        title: true,
      });
    }
  };
  {
    // Show only if createEvent is true
    if (props.createEvent) {
      return (
        <Fragment>
          <Backdrop
            click={() => {
              props.interruptEventCreation();
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
                    <span className="explanation-text form-explanation">
                      {" "}
                      -{" "}
                    </span>
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
                      defaultChecked={true}
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
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="save"
                  />
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      );
    } else {
      return null;
    }
  }
};

const mapStateToProps = (state) => ({
  createEvent: state.calendarEvent.createEvent,
  user: state.auth.user,
  calendar: state.calendar,
});

export default connect(mapStateToProps, {
  createNewEvent,
  interruptEventCreation,
  submitNewEvent,
})(CreateEvent);

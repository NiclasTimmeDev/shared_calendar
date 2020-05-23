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

  const onSubmit = (e) => {
    e.preventDefault();

    const { title, date, start, end, isWholeDay, notes } = formData;
    const from = props.user._id;
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
  };
  {
    if (props.createEvent) {
      return (
        <Fragment>
          <Backdrop
            click={() => {
              console.log("Backdrop clicked");
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
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Add title..."
                    value={formData.title}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />

                  <div>
                    <i className="fas fa-calendar-alt icon-xlarge"></i>
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
                  <div className="inline-children">
                    <i className="fas fa-clock icon-xlarge"></i>
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
                  <div className="inline-children">
                    <i className="fas fa-user icon-xlarge"></i>
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
                  <div className="inline-children">
                    <i className="fas fa-align-left icon-xlarge"></i>
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

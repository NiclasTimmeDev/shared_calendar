const mongoose = require("mongoose");

const calendarEventSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  isWholeDay: {
    type: Boolean,
    default: false,
    required: true,
  },
  wholeDayDate: {
    type: Date,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  calendarID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "calendars",
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const CalendarEventModel = mongoose.model("CalendarEvent", calendarEventSchema);

module.exports = CalendarEventModel;

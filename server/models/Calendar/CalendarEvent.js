const mongoose = require("mongoose");

const calendarEventSchema = new mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  isWholeDay: {
    type: Boolean,
    default: false,
    required: true,
  },
  date: {
    type: Date,
    required: true,
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

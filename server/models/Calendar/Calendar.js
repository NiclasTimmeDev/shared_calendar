const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // tells Mongoose which model to use during population (when using populate())
        required: true,
      },
    },
  ],
  openInvitation: {
    type: String,
  },
});

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;

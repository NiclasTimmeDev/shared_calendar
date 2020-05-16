//3rd Party packages
const express = require("express");
const { check, validationResult } = require("express-validator");

//other files
const Calendar = require("./../../models/Calendar/Calendar");
const CalendarEvent = require("./../../models/Calendar/CalendarEvent");
const auth = require("./../../middleware/auth");

const router = new express.Router();

//==============================
/* Create new calendar */
//==============================
router.post(
  "/create",
  [auth, check("name", "Please enter a name").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const name = req.body.name;

    try {
      const existingCalendarOfUser = await Calendar.find({
        "members.userID": req.user._id,
      });

      console.log(existingCalendarOfUser);

      if (existingCalendarOfUser.length !== 0) {
        return res
          .status(400)
          .send({ errors: [{ msg: "You are already member of a calendar" }] });
      }

      const newCalendar = new Calendar({
        name: name,
        members: [
          {
            userID: req.user._id,
          },
        ],
      });

      res.status(200).send(newCalendar);
      await newCalendar.save();
    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        errors: [
          {
            msg: "Sorry, that should not have happened. Please try again later",
          },
        ],
      });
    }
  }
);

//======================================
/* Create Calendar Event */
//======================================

router.post(
  "/create/event",
  [
    auth,
    check("title", "Please enter a title").not().isEmpty(),
    check("start", "Please enter a start time").not().isEmpty(),
    check("end", "Please enter an end time").not().isEmpty(),
    check("calendarID", "Please specify the calendarID").not().isEmpty(),
    check("to", "Please specify who the event is allocated to.")
      .not()
      .isEmpty(),
    check("isWholeDay", "Please describe if it for the whole day")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array });
    }

    const {
      start,
      end,
      isWholeDay,
      wholeDayDate,
      title,
      notes,
      to,
      calendarID,
    } = req.body;

    const from = req.user._id;

    console.log(req.body);
    try {
      const newCalendarEvent = new CalendarEvent({
        start,
        end,
        isWholeDay,
        wholeDayDate,
        title,
        notes,
        from,
        to,
        calendarID,
      });

      res.status(201).send(newCalendarEvent);
      await newCalendarEvent.save();
    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        errors: [
          {
            msg:
              "Sorry, that should not have happened. Please try again later.",
          },
        ],
      });
    }
  }
);

module.exports = router;

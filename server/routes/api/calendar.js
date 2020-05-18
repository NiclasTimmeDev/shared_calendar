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
/*
1. In middleware, do auth check and request validation
2. If errors occured during validation, send error to user
3. Check if the logged in user is already member in a calendar. If so, send error message
4. Create new Calendar Instance with the id of the user stored in the members array
5. Send newly created Calendar to client and save it to the database
6. If error occurs along the way, send server error to client and log the error message
*/
//==============================
router.post(
  "/create",
  //1:
  [auth, check("name", "Please enter a name").not().isEmpty()],
  async (req, res) => {
    //2:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const name = req.body.name;

    try {
      //3:
      const existingCalendarOfUser = await Calendar.find({
        "members.userID": req.user._id,
      });
      if (existingCalendarOfUser.length !== 0) {
        return res
          .status(400)
          .send({ errors: [{ msg: "You are already member of a calendar" }] });
      }

      //4:
      const newCalendar = new Calendar({
        name: name,
        members: [
          {
            userID: req.user._id,
          },
        ],
      });

      //5:
      res.status(200).send(newCalendar);
      await newCalendar.save();
    } catch (error) {
      //6:
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
/*
1. Do auth middleware check and express-validation checks
2. If errors occur, send error message to client
3. Create variables from req.body
4. Create new instance of CalendarEvent
5. Send new CalendarEvent to client and save it to the database
6. If something goes wrong along the way, send error to client
*/
//======================================

router.post(
  "/create/event",
  [
    //1:
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
    //2:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array });
    }

    //3:
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

    try {
      //4:
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

      //5:
      res.status(201).send(newCalendarEvent);
      await newCalendarEvent.save();
    } catch (error) {
      //6:
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

//===================================
/* Update Calendar event */
/*
1. find the calendar event by id and check if the requestor is the creator of that event
2. Create an array with the fields that will be updated and elete IDs from it as these are no relevant
3. Check that 'from' is not tried to be updated. If it is, send error message
4. Change the respective fields of calendarEvent according to the requested changes
5. Save to DB and send to client
*/
//===================================
router.patch("/events/create", auth, async (req, res) => {
  try {
    //1:
    const calendarEvent = await CalendarEvent.findById(
      req.body.calendarEventID
    );
    if (calendarEvent.from != req.user._id) {
      return res.status(400).send({
        errors: [{ msg: "You don't have the permission to modify this event" }],
      });
    }

    //2:
    const fieldsToBeUpdated = Object.keys(req.body).filter((e, i) => {
      if (e === "calendarEventID" || e === "calendarID") {
        return;
      } else {
        return req.body[e];
      }
    });

    //3:
    const areRequestedUpdatesValid = fieldsToBeUpdated.every((e) => {
      return e !== "from";
    });
    if (!areRequestedUpdatesValid) {
      return res.status(400).send({
        errors: [{ msg: "Sorry, you are trying to edit immutable fields" }],
      });
    }

    //5:
    fieldsToBeUpdated.forEach((field, i) => {
      calendarEvent[field] = req.body[field];
    });

    //6:
    res.status(200).send(calendarEvent);
    await calendarEvent.save();
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      errors: [
        { msg: "Sorry, that should not have happened. Try again later." },
      ],
    });
  }
});

//========================================
/* Find all events of a calendar */
/*
1. Find the calendar where the user is a member
1.2: Send error to client if no calendar was found
2. Find all calendar events that belong to that calendar
3. Send them to the client
*/
//========================================
router.get("/events/findall", auth, async (req, res) => {
  try {
    //1:
    const calendar = await Calendar.findOne({
      "members.userID": req.user._id,
    });

    //1.2
    if (!calendar) {
      return res
        .status(400)
        .send({ errors: [{ msg: "You are not a member of a calendar." }] });
    }

    //2:
    const events = await CalendarEvent.find({
      calendarID: calendar._id,
    });

    //3:
    res.status(200).send(events);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      errors: [{ msg: "Sorry, something went wrong. Try again later." }],
    });
  }
});

//=================================
/* Find one calendar event by id */
/*
1. get calendar event from Database by param in URL
2. If the event is not found, send error to client
3. If the id of the creator of the event (from) or the one the event is allocated to (to) and the person who tried to access the event (req.user._id) do not match, send error
4. Send event to client
*/
//=================================
router.get("/events/find/:event_id", auth, async (req, res) => {
  try {
    //1:
    const eventId = req.params.event_id;
    const event = await CalendarEvent.findById(eventId);

    //2:
    if (!event) {
      return res
        .status(404)
        .send({ errors: [{ msg: "Calendar event not found." }] });
    }

    //3;
    if (
      req.user._id.toString() !== event.from.toString() ||
      req.user._id.toString() !== event.to.toString()
    ) {
      return res.status(401).send({
        errors: [{ msg: "You are not authorized to access this event." }],
      });
    }

    //4:
    res.status(200).send(event);
  } catch (error) {
    console.log(error.message);
    console.log(error.kind);
    if (error.kind == "ObjectId") {
      return res
        .status(404)
        .send({ errors: [{ msg: "Calendar Event not found." }] });
    }
    res.status(500).send({
      errors: [{ msg: "Sorry, something went wrong. Please try again later." }],
    });
  }
});

//=====================================
/* Find members of a calendar */
//=====================================
router.get("/members/find", auth, async (req, res) => {
  try {
    const calendar = await Calendar.findOne({
      "members.userID": req.user._id,
    });

    if (!calendar) {
      return res
        .status(400)
        .send({ errors: [{ msg: "You are not a member of a calendar." }] });
    }

    res.status(200).send(calendar.members);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      errors: [{ msg: "Sorry, somethin went wrong. Please try again later." }],
    });
  }
});

//=================================
/* Delete a calendar */
/*
1. Find the calendar that the user is member in
2. If it cannot be found, send error message to client
3. Delete Calendar and send confirmation to client
*/
//=================================
router.delete("/delete", auth, async (req, res) => {
  try {
    //1:
    const calendar = Calendar.findOne({
      "members.userID": req.user._id,
    });

    //2:
    if (!calendar) {
      return res.status(404).send({ errors: [{ msg: "Calendar not found." }] });
    }

    //3:
    await Calendar.deleteOne({
      _id: calendar._id,
    });
    res.status(200).send("Calendar deleted successfully.");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      errors: [
        {
          msg: "Sorry, that should not have happened. Please try again later.",
        },
      ],
    });
  }
});

//==================================
/* Delete calendar Event */
//==================================
router.delete("/events/delete/:event_id", auth, async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.event_id);

    if (!event) {
      return res
        .status(404)
        .send({ errors: [{ msg: "Calendar event not found" }] });
    }

    if (req.user._id !== event.from.toString()) {
      return res.status(401).send({
        errors: [{ msg: "You are not authorized to delete this event." }],
      });
    }

    await CalendarEvent.deleteOne({
      _id: req.params.event_id,
    });

    res.status(200).send("Calendar event deleted successfully.");
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res
        .status(404)
        .send({ errors: [{ msg: "Calendar event not found." }] });
    }

    res.status(500).send({
      errors: [
        {
          msg: "Soryy, that should not have happened. Please try again later.",
        },
      ],
    });
  }
});

module.exports = router;

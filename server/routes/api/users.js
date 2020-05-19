const express = require("express");
const router = new express.Router();
const User = require("./../../models/User");
const CalendarEvents = require("./../../models/Calendar/CalendarEvent");
const Calendar = require("./../../models/Calendar/Calendar");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("./../../config/config");
const bcrypt = require("bcryptjs");
const auth = require("./../../middleware/auth");

//=============================
/* Register User */
//=============================
router.post(
  "/register",
  [
    check("name", "Your name is required").not().isEmpty(),
    check("email", "Your email is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password of minimum 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //check if form validation resutled in errors. If so return them to client:
    const formErrors = validationResult(req);
    if (!formErrors.isEmpty()) {
      console.log(formErrors);
      return res.status(400).send({ errors: formErrors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //check if there is already a user with that e-mail in the db
      const user = await User.findOne({ email });

      //send error if e-mail is already taken
      if (user) {
        console.log(user);
        return res
          .status(400)
          .send({ errors: [{ msg: "This E-mail is already taken." }] });
      }

      //create gravatar
      const avatar = gravatar.url(email, {
        s: "200", //size 200px
        r: "pg", //no dick pics etc.
        d: "mm", //show user icon if gravatar has no image
      });

      //create new User Object
      const newUser = new User({
        name,
        email,
        password,
        avatar,
      });

      //create payload for webtoken with the _id of the new user
      const tokenPayload = {
        user: {
          _id: newUser._id,
        },
      };

      //create token
      jwt.sign(
        tokenPayload,
        config.tokenSecret,
        { expiresIn: "360000" },
        (err, token) => {
          if (err) {
            return res.status(400).send("Sorry, server error");
          }
          res.status(201).send(token);
        }
      );

      //save new user to database
      await newUser.save();
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Sorry, a server error occured");
    }
  }
);

//======================================
/* Change user info */
/*
1. find user from database
2. send error if no user was found in the database
3. Check, if the user tries to edit the email address. If so, send error to client
4. If the user tries to edit the password, the has to send the old password (password1) and the new one (password2)
4. First, check if the old password was entered correctly. If yes, set the users password to password2. If not, send error to client.
5. Change Name and avatar of user, if requested.
*/
//======================================
router.patch("/edit", auth, async (req, res) => {
  try {
    //1:
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ errors: [{ msg: "User not found" }] });
    }

    //2:
    const fieldsToBeUpdated = Object.keys(req.body);
    const validRequest = fieldsToBeUpdated.every((field) => {
      return field !== "email";
    });

    //3:
    if (!validRequest) {
      return res.status(401).send({
        errors: [{ msg: "Sorry, you can't edit your email address." }],
      });
    }

    //4:
    if ((req.body.password1, req.body.password2)) {
      const isMatchOldPassword = await bcrypt.compare(
        req.body.password1,
        user.password
      );
      if (isMatchOldPassword) {
        user.password = req.body.password2;
      } else {
        res.status(400).send({
          errors: [{ msg: "Your old password is incorrect. Try again." }],
        });
      }
    }

    //5:
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.avatar) {
      user.avatar = req.body.avatar;
    }

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      errors: [{ msg: "Sorry, something went wrong. Please try again later." }],
    });
  }
});

//================================
/* Delete a user */
/*
1. Delete all calendar events where the user is either creator (from) or receiver (to)
2. Delete the user from the calendar he was a member in
3. Delete the user
4. Send confirmation to client
*/
//================================
router.delete("/delete", auth, async (req, res) => {
  try {
    //1:
    await CalendarEvents.deleteMany({
      $or: [{ from: req.user._id }, { to: req.user._id }],
    });

    //2:
    await Calendar.deleteOne({
      "members.userID": req.user._id,
    });

    //3:
    await User.deleteOne({
      _id: req.user._id,
    });

    //4:
    res.status(200).send("User deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      errors: [{ msg: "Sorry, something went wrong. Please try again later." }],
    });
  }
});

module.exports = router;

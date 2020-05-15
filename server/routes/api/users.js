const express = require("express");
const router = new express.Router();
const User = require("./../../models/User");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("./../../config/config");

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

module.exports = router;

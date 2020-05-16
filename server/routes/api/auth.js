//3rd party
const express = require("express");
const router = new express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar"); //for avatar images
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//other project files
//const auth = require("./../../middleware/auth");
const User = require("./../../models/User");
const config = require("./../../config/config");

//==========================
/* Find a user by id*/
/* The id is put in req.user by the auth middleware*/
//==========================
router.get("/", async () => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ errors: [{ msg: "User not found" }] });
  }
});

//==========================
/* Log in a user by id*/
//==========================
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).send({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findByCredentials(email, password);

      if (!user) {
        console.log("no user found");
        return res
          .status(400)
          .send({ errors: [{ msg: "Invalid credentials" }] });
      }

      const tokenPayload = {
        user: {
          _id: user._id,
        },
      };

      jwt.sign(
        tokenPayload,
        config.tokenSecret,
        { expiresIn: "360000" },
        (err, token) => {
          if (err) {
            return res
              .status(400)
              .send({ errors: [{ msg: "Sorry, something went wrong" }] });
          }

          res.status(200).send({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
);

module.exports = router;

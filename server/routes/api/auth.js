//3rd party
const express = require("express");
const router = new express.Router();
const auth = require("./../../middleware/auth");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar"); //for avatar images
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//other project files
const User = require("./../../models/User");
const config = require("./../../config/config");

//==========================
/* Find a user by id*/
/* The id is put in req.user by the auth middleware*/
//==========================
router.get("/", async () => {
  try {
  } catch (error) {
    console.log(error.message);
  }
});

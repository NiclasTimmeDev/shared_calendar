const express = require("express");
const sgMail = require("@sendgrid/mail");
const config = require("./../../config/config");

const router = new express.Router();
sgMail.setApiKey(config.sendGrid_api_key);

router.post("/send", async (req, res) => {
  console.log("auth hit");
  try {
    const msg = {
      to: "niclas.timm@gmx.de",
      from: "niclas.timm@gmx.de",
      subject: "Sending with Twilio SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail.send(msg);
    res.status(200).send("Mail sent");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      errors: [{ msg: "Sorry, something went wrong. Please try again later." }],
    });
  }
});

module.exports = router;

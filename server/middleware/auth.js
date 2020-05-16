const jwt = require("jsonwebtoken");
const config = require("./../config/config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ errors: [{ msg: "No token. Access denied" }] });
  }

  try {
    const decoded = jwt.verify(token, config.tokenSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .send({ errors: [{ msg: "Invalid token. Access denied" }] });
  }
};

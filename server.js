//3. party packages
const express = require("express");

//other files
require("./server/config/db");

const app = express();

//init middleware
app.use(express.json({ extended: false }));

//register api routes
app.use("/api/users", require("./server/routes/api/users"));
app.use("/api/auth", require("./server/routes/api/auth"));
app.use("/api/calendar", require("./server/routes/api/calendar"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on Port " + PORT);
});

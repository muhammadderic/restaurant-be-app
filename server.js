const express = require("express");

// Express instance
const app = express();

// Route
app.use("/", (req, res) => {
  res
    .status(200)
    .send("<h1>Welcome to BeliMakan Server APP API PROJECT</h1>")
})

// Listen to server
app.listen(5000, () => {
  console.log("Server is listening");
})
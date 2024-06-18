const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");

// Express instance
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route
app.use("/api/v1/auth", authRouter);

app.use("/", (req, res) => {
  res
    .status(200)
    .send("<h1>Welcome to BeliMakan Server APP API PROJECT</h1>")
})

// Listen to server
app.listen(5000, () => {
  console.log("Server is listening");
})
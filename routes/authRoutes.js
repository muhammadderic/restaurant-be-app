const router = require("express").Router();

const {
  registerController,
  loginController,
} = require("../controllers/authController");

/**
 * @route     POST /register
 * @desc      Register a new user
 * @access    Public
 * @body      { username, email, password, address, phone, userType, profile, answer }
 * @response  201 Created - User registered successfully
 */
router.post("/register", registerController);

/**
 * @route     POST /login
 * @desc      Authenticate user
 * @access    Public
 * @body      {email, password}
 * @response  201 Login - User log in successfully
 */
router.post("/login", loginController);

module.exports = router;
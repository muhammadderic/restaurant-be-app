const router = require("express").Router();

const {
  registerController,
} = require("../controllers/authController");

/**
 * @route     POST /register
 * @desc      Register a new user
 * @access    Public
 * @body      { username, email, password, address, phone, userType, profile, answer }
 * @response  201 Created - User registered successfully
 */
router.post("/register", registerController);

module.exports = router;
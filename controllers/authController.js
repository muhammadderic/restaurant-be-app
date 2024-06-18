const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const userModel = require("../models/userModel");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { username, email, password, address, phone, userType, profile, answer } = req.body;

    // Validation
    if (username && email && password && address && phone && userType && profile && answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      })
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).send({
        success: false,
        message: "Email already registered, please Login",
      })
    }

    // Password Hashing
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
      userType,
      profile,
      answer,
    })

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      newUser,
    })

  } catch (error) {
    console.error(error);

    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    })
  }
}

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email or password",
      })
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      })
    }

    // Comparing password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(409).send({
        success: false,
        message: "Invalid creadentials",
      })
    }

    // Token generating
    const token = JWT.sign({ id: user._id }, process.env.JWT_SERVER, {
      expiresIn: "3h",
    });
    user.password = undefined;

    res.status(201).send({
      success: true,
      message: "User log in successfully",
      user,
      token,
    })

  } catch (error) {
    console.error(error);

    res.status(500).send({
      success: false,
      message: "Error in log in API",
      error,
    })
  }
}

module.exports = {
  registerController,
  loginController,
}
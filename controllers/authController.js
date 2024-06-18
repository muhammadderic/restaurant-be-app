const bcrypt = require("bcryptjs");

const userModel = require("../models/userModel");

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
      photo,
      userType,
      profile,
      answer,
    })

    res.status(201).send({
      success: true,
      message: "User successfully registered".
        user,
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

module.exports = {
  registerController,
}
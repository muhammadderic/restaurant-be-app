const { Schema, model } = require("mongoose");

const userSchema = Schema({
  username: {
    type: String,
    required: [true, "user name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "email is required"],
  },
  address: {
    type: Array,
    required: [true, "address is required"],
  },
  phone: {
    type: String,
    required: [true, "phone number is required"],
  },
  userType: {
    type: String,
    required: [true],
    default: "client",
    enum: ["client", "admin"],
  },
  profile: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
  },
  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
}, {
  timestamps: true,
})

module.exports = model("User", userSchema);
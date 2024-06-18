const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.error("DB Error", error);
  }
}

module.exports = connectDB;
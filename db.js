const mongoose = require("mongoose");

const url =
  "mongodb+srv://umer:1234@cluster0.z6nrdkx.mongodb.net/ecom?retryWrites=true&w=majority";

const connectToDb = async () => {
  try {
    await mongoose.connect(url);
    console.log("database connected");
  } catch (error) {
    console.log("error connecting database");
  }
};

module.exports = connectToDb;

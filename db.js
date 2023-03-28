const mongoose = require("mongoose");

const url =
  "mongodb+srv://umer:1234@cluster0.z6nrdkx.mongodb.net/ecom?retryWrites=true&w=majority";

const connectToDb = async () => {
  await mongoose.connect(url);
  console.log("database connected");
};

module.exports = connectToDb;

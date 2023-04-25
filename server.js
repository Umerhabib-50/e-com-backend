const app = require("./app");
const cloudinary = require("cloudinary");
const connectToDb = require("./db");

process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log("shutting down server due to uncaught exception error");
  server.close(() => {
    process.exit(1);
  });
});

// database connection function
connectToDb();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen("6000", () => {
  console.log("server started at 6000 port");
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log("shutting down server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});

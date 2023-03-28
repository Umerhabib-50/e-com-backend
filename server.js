const app = require("./app");
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

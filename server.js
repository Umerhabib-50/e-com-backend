const app = require("./app");
const connectToDb = require("./db");

// database connection function
connectToDb();

const server = app.listen("6000", () => {
  console.log("server started at 6000 port");
});

process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log("shutting down server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});

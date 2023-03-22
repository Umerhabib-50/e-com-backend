const app = require("./app");
const connectToDb = require("./db");

// database connection function
connectToDb();

app.listen("6000", () => {
  console.log("server started at 6000 port");
});

const express = require("express");
// const router = require("./routes/productRoute");

const errorMiddleware = require("./middleware/error");
const cookieparser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieparser());

const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
app.use("/api/v1", product);
app.use("/api/v1", user);
// app.use("/api/v1", router);
// app.use("/api/v1", require("./routes/productRoute"));

app.use(errorMiddleware);
module.exports = app;

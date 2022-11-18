const express = require("express");
// const router = require("./routes/productRoute");

const errorMiddleware = require("./middleware/error");

const app = express();
app.use(express.json());
const product = require("./routes/productRoute");

app.use("/api/v1", product);
// app.use("/api/v1", router);
// app.use("/api/v1", require("./routes/productRoute"));

app.use(errorMiddleware);
module.exports = app;

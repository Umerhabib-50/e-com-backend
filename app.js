const express = require("express");
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/error");

// Config
require("dotenv").config({ path: "config.env" });

const app = express();
app.use(express.json());

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use(errorMiddleware);

module.exports = app;

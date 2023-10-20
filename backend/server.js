const express = require("express");
const path = require("path");
const connectDb = require("../config/connectDb");
const invalidRoute = require("./middlewares/invalidRoute");
const errorHandler = require("./middlewares/errorHandler");
const configPath = path.join(__dirname, "..", "config", ".env");
require("colors");
require("dotenv").config({
  path: configPath,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", require("./routes/drinksRoutes"));

app.use(invalidRoute);
app.use(errorHandler)
connectDb();
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`.green.italic.bold);
});

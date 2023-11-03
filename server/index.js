require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const corsOptions = require("./config/cors");
const connectDB = require("./config/database");
const credentials = require("./middleware/credentials");
const errorHandlerMiddleware = require("./middleware/error_handler");

const PORT = 3500;
const app = express();
connectDB();

//Allow Credentials
app.use(credentials);

//CORS
app.use(cors(corsOptions));

//application.x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//application/json response
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//static files
app.use("/static", express.static(path.join(__dirname, "public")));

//Default error handler
app.use(errorHandlerMiddleware);

//Routes
app.use("/api/auth", require("./routes/api/auth"));

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("json")) {
    res.send({ error: "404 Not found" });
  } else {
    res.type("text").send("404 Not found");
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

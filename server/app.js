const express = require("express");
const morgan = require("morgan");

const connectDB = require("./db/db");
const books = require("./routes/v1/books.route");

const app = express();

// parsing application/json
app.use(express.json());
// parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// log http requests
app.use(morgan("dev"));

// Connect to database
connectDB();

// Routes
app.use("/api/v1/books", books);

module.exports = app;

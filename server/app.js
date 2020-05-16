const express = require("express");
const morgan = require("morgan");

const app = express();

// parsing application/json
app.use(express.json());
// parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// log http requests
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello"));

module.exports = app;

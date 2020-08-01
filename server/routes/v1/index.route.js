const express = require("express");

module.exports = api => {
  api.router = express.Router();

  api.router.all("*", (req, res, next) => {
    res.locals.api = api;
    next();
  });

  return {
    ...require("./users.route")(api),
    ...require("./books.route")(api),
  };
};

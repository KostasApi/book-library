const express = require("express");
const morgan = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const errorHandler = require("./middlewares/error");
const connectDB = require("./db/db");
const books = require("./routes/v1/books.route");

const app = express();

// parsing application/json
app.use(express.json());
// parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// log http requests
app.use(morgan("dev"));

// connect to database
connectDB();

// swagger configuration - https://swagger.io/specification/
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book library API",
      description: "Book library API description",
      version: "1.0.0",
      contact: {
        name: "Konstantinos Apidopoulos",
      },
      servers: ["http://localhost:3000"],
    },
    produces: ["application/json"],
    schemes: ["http", "https"],
  },
  apis: ["./routes/**/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// routes
app.use("/api/v1/books", books);

// error handling
app.use(errorHandler);

module.exports = app;

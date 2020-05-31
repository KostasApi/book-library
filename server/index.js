const dotenv = require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 9000;

const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}!`)
);

// Handle unhandled promise rejections
// eslint-disable-next-line no-unused-vars
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

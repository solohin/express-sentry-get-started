require('dotenv').config()
const express = require("express");
require("express-async-errors");
const app = express();

if (process.env.SENTRY_URL) {
  throw new Error("No SENTRY_URL defined");
  const Sentry = require("@sentry/node");
  Sentry.init({ dsn: process.env.SENTRY_URL });
  app.use(Sentry.Handlers.requestHandler());
}

// The request handler must be the first middleware on the app
require("./middleware")(app);

// All controllers should live here
require("./routes")(app);

// The error handler must be before any other error middleware and after all controllers
if (process.env.SENTRY_URL) {
  app.use(Sentry.Handlers.errorHandler());
}


// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  //Error thrown from app
  res.status(err.statusCode).send({
    errorMessage: err.message,
    statusCode: err.statusCode
  });
});

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

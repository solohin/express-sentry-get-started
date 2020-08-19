require('dotenv').config()
const express = require("express");
require("express-async-errors");
const Sentry = require("@sentry/node");
const app = express();

if (!process.env.SENTRY_URL) {
  throw new Error("No SENTRY_URL defined");
}

Sentry.init({ dsn: process.env.SENTRY_URL });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
require("./middleware")(app);

// All controllers should live here
require("./routes")(app);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  //Error thrown from app
  if (err.statusCode && err.statusCode >= 400 && err.statusCode < 600) {
    res.status(err.statusCode).send({
      errorMessage: err.message,
      statusCode: err.statusCode
    });
  } else {//Unexpected error
    console.error("Unexpected error", err)
    res.status(500).send({
      errorMessage: "Internal server error. Please contact technical support.",
      requestId: res.sentry,
      statusCode: 500
    });
  }

  res.end(res.sentry + "\n");
});

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

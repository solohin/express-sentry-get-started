module.exports = function (app) {
  app.get("/", async (req, res) => {
    res.send("hello!");
  });

  /*
    Response:
      {"errorMessage":"Explosion! Boom!","statusCode":500}
    Will be reported to sentry (statusCode || 500 >= 500)
  */
  app.get("/boom1", async (req, res) => {
    const err = new Error("Explosion! Boom!")
    err.statusCode = 500
    throw err
  });

  /*
    Response:
      {"errorMessage":"Internal server error. Please contact technical support.","requestId":"db8e0edbe1b549049263017307754ce5","statusCode":500}
    Will be reported to sentry (statusCode || 500 >= 500)
  */
  app.get("/boom2", async (req, res) => {
    throw new Error("Explosion! Boom!")
  });

  /*
    Response:
      {"errorMessage":"User 1232 does not exists","statusCode":404}
    Will NOT be reported to sentry (statusCode || 500 >= 500)
  */
  app.get("/users/:userId", async (req, res) => {
    if (req.params.userId === '123') {
      res.send({ username: "JohnDoe" })
    } else {
      const err = new Error(`User ${req.params.userId} does not exists`)
      err.statusCode = 404
      throw err
    }
  });



};

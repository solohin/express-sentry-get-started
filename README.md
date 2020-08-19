# Sentry error handling in Nodejs express

Check out [example on glitch](https://glitch.com/edit/#!/express-sentry-get-started)

- Caches async exceptions. Sends errors with code 500+ to Sentry.
- Expects env `SENTRY_URL` to be set.
- All routes put to `routes.js`
- All middleware put to `middleware.js`


## Code samples


### Throw an error

```javascript
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

```

### Add static folder


```javascript
//middlewares.js
app.use(express.static("public"));
```

### Add ejs templates

```javascript
//middlewares.js
app.engine('ejs', require('express-ejs-extend'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```
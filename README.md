# Code samples

## Add static folder

```javascript
app.use(express.static("public"));
```

## Add ejs templates

```javascript
app.engine('ejs', require('express-ejs-extend'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```
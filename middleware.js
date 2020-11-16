module.exports = function (app) {
  app.use(function (req, res, next) {
    //соберем все данные по запросу
    req.allData = Object.assign({}, req.query, req.body)
    console.log(req.method, req.url, req.allData)
    next()
  })
};

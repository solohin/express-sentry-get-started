module.exports = function(app) {
  app.get("/", async (req, res) => {
    res.send("hello!");
  });
};

const express = require("express");
const captcha = require("./captcha");
const app = express();

app.listen(5000, () => {
  console.log("Server started on port 5000...");
});

app.get("/test/:width?/:height?", (req, res) => {
  const width = parseInt(req.params.width) || 200;
  const height = parseInt(req.params.height) || 100;
  const { image } = captcha(width, height);
  res.send(`<img src=${image}>`);
});

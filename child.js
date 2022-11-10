const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.get("/", function (req, res) {
  const content = fs
    .readFileSync(path.join(__dirname, "./config.json"))
    .toString();
  res.send(content);
});

app.listen(3000);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dns = require("dns");
// Basic Configuration
const port = process.env.PORT || 3000;
let num = 1;
let obj = {};
app.use(express.json());
app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/api/shorturl/:id", function (req, res) {
  res.redirect(obj[req.params.id]);
});

app.post("/api/shorturl", function (req, res) {
  const { url } = req.body;
  let error = false;
  dns.lookup(url, function (err, dns) {
    if (err) {
      error = true;
      res.json({ error: "invalid url" });
    }
  });

  if (!error) {
    obj[num] = url;
    return res.json({
      original_url: url,
      short_url: num++,
    });
  }
});
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

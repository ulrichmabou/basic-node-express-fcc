require('dotenv').config()

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

let FileAbsolutePath = __dirname + "/views/index.html";
let AssetsAbsolutePath = __dirname + "/public";

app.use("/public", express.static(AssetsAbsolutePath));

app.use(function middleware(req, res, next) {
  let string = `${req.method} ${req.path} - ${req.ip}`;
  console.log(string);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(FileAbsolutePath)
});

app.get('/json', (function(req, res) {
  const mySecret = process.env['MESSAGE_STYLE'];
  if (mySecret === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }

}));

app.get('/now', function(req, res, next) {
  let time = new Date().toString();
  req.time = time;
  next();
}, function(req, res) {
  res.json({ time: req.time });
});

app.get('/:word/echo', function(req, res) {
  res.send({ echo: req.params.word });
});

app.get('/name', function(req, res) {
  const { first: firstName, last: lastName } = req.query;
  res.json({ name: `${firstName} ${lastName}` });
});

app.post('/name', function(req, res) {
  res.json({ name: `${req.body.first} ${req.body.last}`});
});



module.exports = app;

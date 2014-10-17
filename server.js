var express = require('express');
var app = express();
var handler = require('./handler.js');

app.get('/check-number', handler.checkNumber);

app.use(express.static("public"));
console.log("App started");

app.listen(process.env.PORT);
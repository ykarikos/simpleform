var express = require('express');
var app = express();

app.use(express.static("public"));
console.log("App started");

app.listen(process.env.PORT);
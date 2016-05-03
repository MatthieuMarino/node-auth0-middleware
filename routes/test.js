var express = require('express');
var test = express.Router();

/* GET users listing. */
test.get('/', function(req, res, next) {
  res.send('Testing : respond with a resource');
});

module.exports = test;

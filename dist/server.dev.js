"use strict";

var _require = require('express'),
    query = _require.query,
    request = _require.request,
    response = _require.response;

var express = require('express');

var _require2 = require('http'),
    get = _require2.get;

var app = express();
app.use(express["static"](__dirname + '/static'));
app.get('/', function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get('/catalog', function (request, response) {
  response.sendFile(__dirname + "/catalog.html");
});
app.get('/order', function (request, response) {
  response.sendFile(__dirname + "/order.html");
});
app.get('/favorites', function (request, response) {
  response.sendFile(__dirname + "/favorites.html");
});
app.get('/cart', function (request, response) {
  response.sendFile(__dirname + "/cart.html");
});
app.get('/CPU', function (request, response) {
  response.sendFile(__dirname + "/CPU.html");
});
app.get('/motherboards', function (request, response) {
  response.sendFile(__dirname + "/motherboards.html");
});
app.get('/cases', function (request, response) {
  response.sendFile(__dirname + "/cases.html");
});
app.listen(3000, function () {
  console.log('Server stated on: http://127.0.0.1:3000');
});
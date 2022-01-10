const { query, request, response, json } = require('express');
const express = require('express');
const res = require('express/lib/response');
const { render } = require('express/lib/response');
const { get, STATUS_CODES } = require('http');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
// const fs = require('fs'); // подключаем модуль для работы с файловой структурой
// const dataFromFile = fs.readFileSync(__dirname + '/json/tovary.json', 'utf-8'); // читаем файл
// const dataToJson = JSON.parse(dataFromFile); // парсим в объект


app.use(express.static(__dirname + '/public'));

// app.use(express.static('/public'));


const nunjucks = require('nunjucks');
const { userInfo } = require('os');
const { dirname } = require('path');
var TmplPath = '.';
nunjucks.configure(TmplPath, {
    autoescape: true,
    express: app
});
// Роуты для сайта

// app.get('',function(req, res){ something here }) <--- Гет запрос 
app.get('/', function (request, response) {
    let json = require(__dirname + '/json/TovarTypes.json');

    response.render(__dirname + '/nunjucks/index.njk', json);
});
// app.get('/catalog', function (request, response) {
//     response.render(__dirname + "/nunjucks/catalog.njk");
// });
app.get('/profile', function (request, response) {
    response.render(__dirname + "/nunjucks/profile.njk");
});
app.get('/favorites', function (request, response) {
    response.render(__dirname + "/nunjucks/favorites.njk");
});
app.get('/cart', function (request, response) {
    response.render(__dirname + "/nunjucks/cart.njk");
});
// app.get('/processors', function (request, response) {
//     let json = require(__dirname + '/json/tovarCPU.json');
//     response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
// });

// app.get('/goods/processors/processor', function (request, response) {
//     let json = require(__dirname + '/json/tovarCPU.json');
//     response.render(__dirname + "/nunjucks/TovarPage.njk", json);
// });
// app.get('/goods/motherboards', function (request, response) {
//     let json = require(__dirname + '/json/tovarMotherboard.json');
//     response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
// });
// app.get('/goods/motherboards/motherboard/', function (request, response) {
//     let json = require(__dirname + '/json/tovarMotherboard.json');
//     response.render(__dirname + "/nunjucks/TovarPage.njk", json);
// });
// app.get('/goods/cases', function (request, response) {
//     let json = require(__dirname + '/json/tovarCase.json');
//     response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
// });
// app.get('/goods/cases/case/', function (request, response) {
//     let json = require(__dirname + '/json/tovarCase.json');
//     response.render(__dirname + "/nunjucks/TovarPage.njk", json);
// });
app.get('/catalog/*/', function (request, response) {
    let json = require(__dirname + '/json/TovarTypes.json');
    response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
});
app.get('/product/*/*', function (request, response) {
    response.render(__dirname + "/nunjucks/TovarPage.njk");
});
// ниже как НАДО, выше как есть =) =D
// app.get('/product/*/{{TovarName}}', function (request, response) {
//     response.render(__dirname + "/nunjucks/TovarPage.njk");
// });
// /product/1235fas/i3-10100f
// /catalog/catalogNumber/processors
// Роуты конец
app.listen(port, function () {
    console.log(`Server stated on: http://${hostname}:${port}`)
});
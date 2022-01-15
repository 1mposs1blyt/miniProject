const { query, request, response, json } = require('express');
const express = require('express');
const res = require('express/lib/response');
const { render } = require('express/lib/response');
const { get, STATUS_CODES } = require('http');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const fs = require('fs'); // подключаем модуль для работы с файловой структурой
const { fstat } = require("fs");

var jquery = require('jquery');

const cookieParser = require('cookie-parser');

app.use(express.static(__dirname + '/public'));
// app.use(express.static('/public'));


const nunjucks = require('nunjucks');
const { userInfo } = require('os');
const { dirname } = require('path');
const { data } = require('jquery');
const e = require('express');
var TmplPath = '.';
nunjucks.configure(TmplPath, {
    autoescape: true,
    express: app
});
// Роуты для сайта
// const indexJs = require(__dirname + '/server.js');

// app.get('',function(req, res){ something here }) <--- Гет запрос 
app.get('/', function (request, response) {
    let json = require(__dirname + '/json/TovarTypes.json');
    response.render(__dirname + '/nunjucks/index.njk', json);
});

//  "/:userId/профиль,избранное,корзина"
app.get('/:userId/profile', function (request, response) {
    userId = request.params["userId"]
    let json = require(__dirname + '/json/cart.json');
    response.render(__dirname + "/nunjucks/profile.njk", json);
});
app.get('/:userId/favorites', function (request, response) {
    userId = request.params["userId"]
    let json = require(__dirname + '/json/cart.json');
    response.render(__dirname + "/nunjucks/favorites.njk", json);
});
app.get('/:userId/cart', function (request, response) {
    userId = request.params["userId"]
    let json = require(__dirname + '/json/cart.json');
    response.render(__dirname + "/nunjucks/cart.njk", json);
})
////////////////////////////////////
// Все остальные страницы каталога
app.get('/product/:productId/:productName', function (request, response) {
    productName = request.params["productName"]
    productId = request.params["productId"]
    let json = require(__dirname + '/json/TovarTypes.json');
    response.render(__dirname + "/nunjucks/TovarPage.njk", json);
});
app.get('/product/:productId/:productName', function (request, response) {
    productName = request.params["productName"]
    productId = request.params["productId"]
    let json = require(__dirname + '/json/TovarTypes.json');
    response.render(__dirname + "/nunjucks/TovarPage.njk", json);
});
app.get('/catalog/:catalogId/:category', function (request, response) {
    catalogId = request.params["catalogId"]
    category = request.params["category"]
    if (category == "processors") {
        let json = require(__dirname + '/json/TovarTypes.json');
        response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
    } else if (category == "ram") {
        let json = require(__dirname + '/json/TovarRam.json');
        response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
    } else if (category == "motherboards") {
        let json = require(__dirname + '/json/tovarMotherboard.json');
        response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
    }
    else {
        let json = require(__dirname + '/json/TovarTypes.json');
        response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
    }
});
app.get('/catalog/:catalogId/', function (request, response) {
    catalogId = request.params["catalogId"]
    let json = require(__dirname + '/json/TovarTypes.json');
    response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
});
////////////////////////////////////
app.listen(port, function () {
    console.log(`Server stated on: http://${hostname}:${port}`)
});
// "/tovary/:type/:custom" => "/tovary/TovarTypes/TovarTypeCPU"
// all = {
//     "TovarTypes":{
//         "TovarTypeCPU":{...}
//         "TovarTypeRAM":{...}
//         "TovarTypeMotherBoards":{}
//     }
// }
// type = request.params["type"]
// custom = request.params["custom"]
// data = all[type][custom]
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

    // let json = require(__dirname + '/json/tovary.json');
    // 
    // for (const key in json) {
    //     console.log(key, json[key]); // выводит ключи в объекте
    // }
    // console.log(dataToJson.TovarType)
    response.render(__dirname + '/nunjucks/index.njk');
});
app.get('/catalog', function (request, response) {
    // let json = require(__dirname + '/json/tovary.json');

    response.render(__dirname + "/nunjucks/catalog.njk");
});
app.get('/profile', function (request, response) {
    // let json = require(__dirname + '/json/tovary.json');

    response.render(__dirname + "/nunjucks/profile.njk");
});
app.get('/favorites', function (request, response) {
    // let json = require(__dirname + '/json/tovary.json');

    response.render(__dirname + "/nunjucks/favorites.njk");
});
app.get('/cart', function (request, response) {
    // let json = require(__dirname + '/json/tovary.json');

    response.render(__dirname + "/nunjucks/cart.njk");
});
app.get('/CPU', function (request, response) {
    let json = require(__dirname + '/json/tovarCPU.json');
    // let json2 = JSON.stringify(json)
    response.render(__dirname + "/nunjucks/TovarsPage.njk", json)
    // let PgN = request.query.PgN;
    // if (PgN == "1" || PgN == "2" || PgN == "3" || PgN == "4" || PgN == "5") {
    //     response.sendFile(__dirname + "/nunjucks/CPU.njk/?${pagefNum}")
    // }    
});

app.get('/CPU/cpu/', function (request, response) {
    let json = require(__dirname + '/json/tovarCPU.json');
    response.render(__dirname + "/nunjucks/TovarPage.njk", json);
});
app.get('/motherboards', function (request, response) {
    let json = require(__dirname + '/json/tovarMotherboard.json');
    response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
});
app.get('/motherboards/motherboard/', function (request, response) {
    let json = require(__dirname + '/json/tovarMotherboard.json');
    response.render(__dirname + "/nunjucks/TovarPage.njk", json);
});


app.get('/cases', function (request, response) {
    let json = require(__dirname + '/json/tovarCase.json');
    response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
});
app.get('/cases/case/', function (request, response) {
    let json = require(__dirname + '/json/tovarCase.json');
    response.render(__dirname + "/nunjucks/TovarPage.njk", json);
});


// Роуты конец
app.listen(port, function () {
    console.log(`Server stated on: http://${hostname}:${port}`)
});
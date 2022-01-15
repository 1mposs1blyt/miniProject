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
var TmplPath = '.';
nunjucks.configure(TmplPath, {
    autoescape: true,
    express: app
});
// Роуты для сайта
const indexJs = require(__dirname+'/server.js');

// app.get('',function(req, res){ something here }) <--- Гет запрос 
app.get('/', function (request, response) {
    // var email = request.query.email;
    // var password = request.query.password;
    // var cookie = email;
    // var cookie2 = password;
    // cookie = encodeURIComponent("email") + '=' + encodeURIComponent(email);
    // // cookie = encodeURIComponent("password") + '=' + encodeURIComponent(password);
    // // if(cookie = "dddddd"){
    // //     console.log("logged")
    // // }
    // console.log(cookie)


    // Переделать код ниже под себя, для добавления в корзину/избр  и  данные пользователя(email,password)
    // var request = new XMLHttpRequest();
    // request.open('GET', requestURL);
    // request.responseType = 'json';
    // request.send();
    // request.onload = function () {
    //     var superHeroes = request.response;
    //     populateHeader(superHeroes);
    //     showHeroes(superHeroes);
    // }
    // function populateHeader(jsonObj) {
    //     var myH1 = document.createElement('h1');
    //     myH1.textContent = jsonObj['squadName'];
    //     header.appendChild(myH1);

    //     var myPara = document.createElement('p');
    //     myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
    //     header.appendChild(myPara);
    // }
    let json = require(__dirname + '/json/TovarTypes.json');
    response.render(__dirname + '/nunjucks/index.njk', json);
});
// app.get('/catalog', function (request, response) {
//     response.render(__dirname + "/nunjucks/catalog.njk");
// });
app.get('/*/profile', function (request, response) {
    console.log(request.cookies); // объект с куками

    let json = require(__dirname + '/json/cart.json');
    response.render(__dirname + "/nunjucks/profile.njk", json);
});
app.get('/*/favorites', function (request, response) {
    let json = require(__dirname + '/json/cart.json');
    response.render(__dirname + "/nunjucks/favorites.njk", json);
});
app.get('/*/cart', function (request, response) {
    let json = require(__dirname + '/json/cart.json');
    response.render(__dirname + "/nunjucks/cart.njk", json);
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
app.get('/catalog/*/processors', function (request, response) {
    let json = require(__dirname + '/json/tovarCPU.json');
    response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
});
app.get('/product/*/*', function (request, response) {
    let json = require(__dirname + '/json/TovarTypes.json');
    response.render(__dirname + "/nunjucks/TovarPage.njk", json);
});
app.get('/product/*/ram', function (request, response) {
    let json = require(__dirname + '/json/TovarRam.json');
    response.render(__dirname + "/nunjucks/TovarPage.njk", json);
});
app.get('/product/*/processors', function (request, response) {
    let json = require(__dirname + '/json/tovarCPU.json');
    response.render(__dirname + "/nunjucks/TovarPage.njk", json);
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
const express = require('express');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const stringSimilarity = require("string-similarity");


var jquery = require('jquery');

const cookieParser = require('cookie-parser');

app.use(express.static(__dirname + '/public'));
// app.use(express.static('/public'));


const nunjucks = require('nunjucks');
var TmplPath = '.';
nunjucks.configure(TmplPath, {
    autoescape: true,
    express: app
});
// Роуты для сайта
// const indexJs = require(__dirname + '/server.js');

// app.get('',function(req, res){ something here }) <--- Гет запрос 





// let TovarName = TovarName;
// let TovarPrice = TovarPrice;
// let CardText = CardText;
// let btnText = btnText;
// let TovarName = TovarName;
// let page = page;
// let catalogId = catalogId;
// let currency = currency;
// let cardImage = cardImage;
// let productId = productId;
// const TovarList = [
//     {
//         TovarNameTovarName,
//         "TovarPrice": "6500",
//         "CardText": "lorem 1...",
//         "btnText": "Купить",
//         "page": "processor",
//         "catalogId": "1242",
//         "currency": "рублей",
//         "productId": "1235fas",
//         "cardImage": "/static/images/CPUHolder.png"

//     }
// ]



////////////////////////////////////
///////////////header///////////////
////////////////////////////////////
app.get('/', function (request, response) {
    let json = require(__dirname + '/json/TovarTypes.json');
    // let jsonSTR = JSON.stringify(json);


    // let jsonTest = require(__dirname + '/json/index.json')
    // let jsonTestStr = JSON.stringify(jsonTest)
    // let searchValue = request.query.searchValue;


    // var similarity1 = stringSimilarity.compareTwoStrings(String(searchValue), jsonTestStr);
    // let similarity2 = similarity1 * 100
    // console.log(similarity2)
    // let similarity = Math.round(similarity2)
    // if (similarity > 0.15) {
    //     response.render(__dirname + "/nunjucks/TovarsPage.njk", jsonTest);
    //     console.log(similarity)
    // } else {
    //     console.log(similarity)
    response.render(__dirname + '/nunjucks/index.njk', json);
    // }
});





app.get('/catalog/search', (request, response) => {
    // let json = require(__dirname + '/json/index.json')
    // let jsonStr = JSON.stringify(json);
    // response.render(__dirname + '/nunjucks/Catalog-Searched.njk', json)



    let json = require(__dirname + '/json/TovarTypes.json');
    let jsonTest = require(__dirname + '/json/index.json')
    let jsonTestStr = JSON.stringify(jsonTest)
    let searchValue = request.query.searchValue;


    // var similarity1 = stringSimilarity.compareTwoStrings(String(searchValue), jsonTestStr);
    // let similarity1 = stringSimilarity.findBestMatch(String(searchValue), [jsonTest])
    var similarity = stringSimilarity.findBestMatch(String(searchValue), [
        jsonTestStr
    ]);
    console.log(similarity)
    // let similarity2 = similarity1 * 100
    // console.log(similarity2)
    // let similarity = Math.round(similarity2)
    if (similarity > 0.2) {
        response.render(__dirname + "/nunjucks/TovarsPage.njk", jsonTest);
        console.log(similarity)
        if (category == "processors") {
            response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
            // Если совпадение больше 0,2 то рендерить карточку на которой совпало каким то образом
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
    } else if (similarity < 0.2) {
        console.log(similarity)
        response.render(__dirname + '/nunjucks/TovarsPage.njk', json);
    }


})
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

///////////The_end//////////////////
////////////header//////////////////
///////////The_end//////////////////




////////////////////////////////////
// Все остальные страницы каталога//
////////////////////////////////////
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

    // let json = require(__dirname + '/json/TovarTypes.json');
    // response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
});
app.get('/catalog/:catalogId/', function (request, response) {
    catalogId = request.params["catalogId"]
    let json = require(__dirname + '/json/TovarTypes.json');
    response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
});
app.get('/catalog/', function (request, response) {

    // response.send("<h1>Catalog page coming soon...</h1> <h1><a href='/'>Back</a></h1>")
    // catalogId = request.params["catalogId"]
    // let json = require(__dirname + '/json/TovarTypes.json');
    // response.render(__dirname + "/nunjucks/catalog.njk", json);
    let json = require(__dirname + '/json/TovarTypes.json');
    let jsonTest = require(__dirname + '/json/index.json')
    let jsonTestStr = JSON.stringify(jsonTest)
    let searchValue = request.query.searchValue;


    var similarity1 = stringSimilarity.findBestMatch(String(searchValue), jsonTestStr);
    console.log(similarity1)
    let similarity2 = similarity1 * 100
    console.log(similarity2)
    let similarity = Math.round(similarity2)
    if (similarity > 0.2) {
        response.render(__dirname + "/nunjucks/TovarsPage.njk", jsonTest);
        console.log(similarity)
        if (category == "processors") {
            response.render(__dirname + "/nunjucks/tovar.html", json);
            // response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
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
    } else if (similarity < 0.2) {
        console.log(similarity)
        response.render(__dirname + '/nunjucks/catalog.njk', json);
    }
});
///////////The end//////////////////
//Все остальные страницы каталога///
///////////The end//////////////////
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

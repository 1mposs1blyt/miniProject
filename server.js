const express = require('express');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const stringSimilarity = require("string-similarity");
const fs = require('fs');
const cookieParser = require('cookie-parser')
app.use(cookieParser('secret key'))

const jsonParser = express.json()

var jquery = require('jquery');


app.use(express.static(__dirname + '/public'));
// app.use(express.static('/public'));


const nunjucks = require('nunjucks');
const { clear } = require('console');
const { ajax } = require('jquery');
var TmplPath = '.';
nunjucks.configure(TmplPath, {
    autoescape: true,
    express: app
});
// Роуты для сайта
// const indexJs = require(__dirname + '/server.js');

// app.get('',function(req, res){ something here }) <--- Гет запрос 
app.post('/user', jsonParser, function (request, response) {
    console.log(request.body)
    if (!request.body) return response.sendStatus(400)

    response.json(request.body) // отправляем пришедший ответ обратно
})
app.get('/test', function (request, response) {
    response.render(__dirname + "/stuff/test.html")
})


////////////////////////////////////
///////////////header///////////////
////////////////////////////////////
app.get('/', function (request, response) {
    response.clearCookie('SearchedList')
    let json = require(__dirname + '/json/TovarTypes.json');
    response.render(__dirname + '/nunjucks/index.njk', json);

});



app.get('/catalog/search', (request, response) => {
    const data = require(__dirname + '/json/TovarTypes.json');
    let search = request.query.search;
    var SearchedList = [];
    // response.clearCookie('SearchedList')
    // console.log(request.cookies)
    async function searchf2() {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("готово!"), 5000)
            for (let i = 0, l = data.TovarList.length; i < l; i++) {
                var obj = data.TovarList[i];
                var similarity = stringSimilarity.compareTwoStrings(String(search.toLowerCase()), obj.TovarName.toLowerCase())
                if (similarity > 0.5) {
                    // console.log(similarity)
                    let search = SearchedList.push(obj)
                    response.cookie('SearchedList', SearchedList)
                }
            }
        })

        let result = await promise;
    }

    // async function searchf() {
    //     // return request.cookies
    //     let promise = new Promise((resolve, reject) => {
    //         // setTimeout(() => resolve("готово!"), 3000)
    //     })
    //     let result = await promise;
    // }

    // searchf()
    searchf2().then(response.render(__dirname + '/nunjucks/Catalog-Searched.njk', request.cookies))



    // response.clearCookie('SearchedList')

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

///////////The end///////////////////
////////////header///////////////////
///////////The end///////////////////




/////////////////////////////////////
///Все остальные страницы каталога///
/////////////////////////////////////
app.get('/product/:productId/:productName', function (request, response) {
    productName = request.params["productName"]
    productId = request.params["productId"]
    // let json = require(__dirname + '/json/TovarTypes.json');
    // response.render(__dirname + "/templa/tovar.html", json);
    response.send('<h1><a href="/">BACK</a></h1>')
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
    let json = require(__dirname + '/json/TovarTypes.json');
    response.render(__dirname + "/nunjucks/TovarsPage.njk", json);
});
app.get('/catalog/', function (request, response) {
    let json = require(__dirname + '/json/TovarTypes.json');
    response.render(__dirname + '/nunjucks/catalog.njk', json);
});
app.use(function (req, res) {
    res.status(404).render(__dirname + '/404.html');
});
///////////The end///////////////////
///Все остальные страницы каталога///
///////////The end///////////////////

app.listen(port, function () {
    console.log(`Server stated on: http://${hostname}:${port}`)
});
// "/tovary/:type/:custom" => "/tovary/TovarTypes/TovarTypeCPU"
// all = {
//     "TovarTypes":{
//         "TovarTypeCPU":{...}лл
//         "TovarTypeRAM":{...}лл
//         "TovarTypeMotherBoards":{}лл
//     }
// }лл
// type = request.params["type"]лл
// custom = request.params["custom"]
// data = all[type][custom]

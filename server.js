const express = require('express');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const stringSimilarity = require("string-similarity");
const fs = require('fs');


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

// app.get('/test', function (req, res) {
//     // const data = {
//     //     items: [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]
//     // };
//     // const item_name = data['items']['name'];
//     // console.log(item_name);
//     const data = require(__dirname + '/json/TovarTypes.json');
//     for (let i = 0, l = data.TovarList.length; i < l; i++) {
//         var obj = data.TovarList[i];
//         console.log(obj.TovarName);
//         let search = req.query.searchValue;
//         let similarity = stringSimilarity.compareTwoStrings(String(search), obj.TovarName)


//     } res.send(`<h1>${obj.TovarName}</h1>`)


//     // res.send(`<h1>${obj.name}</h1>`)

// })


////////////////////////////////////
///////////////header///////////////
////////////////////////////////////
app.get('/', function (request, response) {
    let json = require(__dirname + '/json/TovarTypes.json');
    response.render(__dirname + '/nunjucks/index.njk', json);

});



app.get('/catalog/search', (request, response) => {
    const data = require(__dirname + '/json/TovarTypes.json');
    let search = request.query.search;
    var SearchedList = [];


    async function searchf() {
        let promise = new Promise((resolve, reject) => {
            // resolve("ready")
            for (let i = 0, l = data.TovarList.length; i < l; i++) {
                var obj = data.TovarList[i];
                var similarity = stringSimilarity.compareTwoStrings(String(search.toLowerCase()), obj.TovarName.toLowerCase())
                if (similarity > 0.5) {
                    // console.log(similarity)
                    let search = SearchedList.push(obj)
                }
            }
            var SearchedListF1 = fs.writeFileSync(__dirname + '/json/searcheditems.json', JSON.stringify({ SearchedList }))
            var SearchedListF2 = require(__dirname + '/json/searcheditems.json');
            response.render(__dirname + '/nunjucks/Catalog-Searched.njk', SearchedListF2)//вероятнее всего эта чтрочка должна бытть гдето в другом месте
            resolve(SearchedListF2)
        })

        let FinalRender = await promise;

        console.log(FinalRender);
    }
    searchf()


    // let json2 = SearchedList;
    // console.log(JSON.stringify(SearchedList))




    // async function f() {

    //     let promise = new Promise((resolve, reject) => {
    //         setTimeout(() => resolve("готово!"), 1000)
    //     });

    //     let result = await promise; // будет ждать, пока промис не выполнится (*)

    //     console.log(result); // "готово!"
    // }

    // f();

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
//     }лл
// }лл
// type = request.params["type"]лл
// custom = request.params["custom"]
// data = all[type][custom]

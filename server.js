const express = require('express');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const stringSimilarity = require("string-similarity");
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret key'))
const sqlite = require("sqlite3")
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

async function get_data(query, data_query) {
    let db = new sqlite.Database("TestDatabase.db", (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("connect to db complete!");
        }
    });
    let sql_queries = {
        all: `SELECT * FROM Goods`,
        CPU: `SELECT * FROM Goods WHERE page = 'processor'
        UNION
        SELECT * FROM Goods WHERE page = 'CPU'
        `,
        MOBO: `SELECT * FROM Goods WHERE page = 'motherboard'
        UNION
        SELECT * FROM Goods WHERE page = 'mobo'`,
        RAM: `SELECT * FROM Goods WHERE page = 'ram'`,
        categoryes: `SELECT * FROM categoryes`,
        cart: `SELECT * FROM usercart `,
        search: `SELECT * FROM goods WHERE name LIKE name`
    }
    let sql = sql_queries[query];
    let promise = new Promise((resolve, reject) => {
        db.all(sql, data_query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows)
            }
        });
    })

    let data = await promise;
    db.close();
    return data;
}

const jsonParser = express.json()

app.use(express.static(__dirname + '/public'));
// app.use(express.static('/public'));


const nunjucks = require('nunjucks');
var TmplPath = '.';
nunjucks.configure(TmplPath, {
    autoescape: true,
    express: app
});
var env = nunjucks.configure(".", { autoescape: false });

// Роуты для сайта

// app.get('',function(req, res){ something here }) <--- Гет запрос 

////////////////////////////////////
///////////////header///////////////
////////////////////////////////////
app.get('/', function (request, response) {
    let item = require(__dirname + '/json/TovarTypes.json');
    get_data("categoryes", []).then((resolve) => {
        console.log({ resolve })
        response.render(__dirname + '/templates/index.html', { item, resolve });
    })
});



app.get('/catalog/search', (request, response) => {
    get_data("search", []).then((resolve) => {
        response.render(__dirname + '/templates/Catalog-Searched.html', { resolve });
    })
})

app.get('/:userId/favorites', function (request, response) {
    userId = request.params["userId"]
    let json = require(__dirname + '/json/cart.json');
    response.render(__dirname + "/templates/favorites.html", json);
});
app.get('/:userId/cart', function (request, response) {
    userId = request.params["userId"]
    get_data("all", []).then((resolve) => {
        console.log({ resolve })
        response.render(__dirname + "/templates/cart.html", { resolve });
    })
})
app.get("/order", function (request, response) {
    get_data("all", []).then((resolve) => {
        console.log({ resolve })
        response.render(__dirname + "/templates/order.html", { resolve });// роут на страницу оформления заказа //потом
    })
})
app.get("/order/ready", function (request, response) {
    // get_data("all", []).then((resolve) => {
    //     console.log({ resolve})
    //     response.render(__dirname + "/templates/order-ready.html", { resolve });// роут на страницу оформления заказа //потом
    // })
    console.log(request.body)
    // response.render(__dirname + "/templates/order-ready.html", request.body);

})
app.post("/order/ready", function (request, response) {
    let OrderOpt = request.body;
    get_data("all", []).then((resolve) => {
        console.log({ OrderOpt, resolve })
        response.render(__dirname + "/templates/order-ready.html", { OrderOpt, resolve });// );// роут на страницу оформления заказа //потом
    })
    // console.log(request.body)
    // response.render(__dirname + "/templates/order-ready.html", request.body);
})

///////////The end///////////////////
////////////header///////////////////
///////////The end///////////////////




/////////////////////////////////////
///Все остальные страницы каталога///
/////////////////////////////////////


// app.get('/product/:productId/:productName', function (request, response) {
//     productName = request.params["productName"]
//     productId = request.params["productId"]
//     // let json = require(__dirname + '/json/TovarTypes.json');
//     // response.render(__dirname + "/templa/tovar.html", json);
//     response.send('<h1><a href="/">BACK</a></h1>')
// });
// app.get('/product/:productId/:productName', function (request, response) {
//     productName = request.params["productName"]
//     productId = request.params["productId"]
//     let json = require(__dirname + '/json/TovarTypes.json');
//     response.render(__dirname + "/templates/TovarPage.html", json);
// });
app.get('/catalog/:catalogId/:category', function (request, response) {
    catalogId = request.params["catalogId"]
    category = request.params["category"]
    if (category == "motherboards") {
        get_data("MOBO", []).then((resolve) => {
            // console.log({ resolve })
            response.render(__dirname + '/templates/TovarsPage.html', { resolve });
        })
    } else if (category == "ram") {
        get_data("RAM", []).then((resolve) => {
            // let name = localStorage.setItem("name","aaaa")
            // let data = localStorage.getItem("name")
            // console.log({ data })

            response.render(__dirname + '/templates/TovarsPage.html', { resolve });
        })
    } else if (category == "processors") {
        get_data("CPU", []).then((resolve) => {
            console.log({ resolve })
            response.render(__dirname + '/templates/TovarsPage.html', { resolve });
        })
    } else if (category == "search" && catalogId == "search") {
        get_data("search", []).then((resolve) => {
            console.log({ resolve })
            response.render(__dirname + '/templates/TovarsPage.html', { resolve });
        })
    }
    // }else if (category == "processors"){
    //     get_data("CPU", []).then((resolve) => {
    //         console.log({resolve})
    //         response.render(__dirname + '/templates/TovarsPage.html', { resolve });
    //     })
    // }else if (category == "processors"){
    //     get_data("CPU", []).then((resolve) => {
    //         console.log({resolve})
    //         response.render(__dirname + '/templates/TovarsPage.html', { resolve });
    //     })
    // }else if (category == "processors"){
    //     get_data("CPU", []).then((resolve) => {
    //         console.log({resolve})
    //         response.render(__dirname + '/templates/TovarsPage.html', { resolve });
    //     })
    // }
    // потом дописать еще чтонибудь
    else {
        get_data("all", []).then((resolve) => {
            response.render(__dirname + '/templates/TovarsPage.html', { resolve });
        })
    }


});
app.get("/catalog/GoodCard", function (req, res) {
    get_data("cart", []).then((resolve) => {
        res.render(__dirname + '/templates/MiniCartCard.html', { resolve });
    })
    // res.render(__dirname+"templates/MiniCartCard.html")
})
app.get("/catalog/miniCart", function (req, res) {
    get_data("all", []).then((resolve) => {
        res.render(__dirname + '/templates/MiniCart.html', { resolve });
    })
})
app.get('/catalog/', function (request, response) {
    // let json = require(__dirname + '/json/TovarTypes.json');
    // response.render(__dirname + '/templates/catalog.html', json);
    // let item = require(__dirname + '/json/TovarTypes.json');

    get_data("categoryes", []).then((resolve) => {
        // console.log({ resolve})
        let TovarTypeList = resolve;
        response.render(__dirname + '/templates/catalog.html', { TovarTypeList });
    })
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

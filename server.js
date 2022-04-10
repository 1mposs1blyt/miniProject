const express = require('express');
const app = express();
const port = 3200;
const hostname = '192.168.1.51';
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
            // console.log("connect to db complete!");
        }
    });
    let sql_queries = {
        all: `SELECT * FROM Goods`,
        CPU: `SELECT * FROM Goods WHERE page = 'processor'
        UNION
        SELECT * FROM Goods WHERE page = 'CPU' ORDER BY price`,
        MOBO: `SELECT * FROM Goods WHERE page = 'motherboard'
        UNION
        SELECT * FROM Goods WHERE page = 'mobo' ORDER BY price`,
        RAM: `SELECT * FROM Goods WHERE page = 'ram' ORDER BY price`,
        categoryes: `SELECT * FROM categoryes ORDER BY categoryname`,
        cart: `SELECT * FROM usercart ORDER BY price`,
        search: `SELECT * FROM goods ORDER BY price`,//работает через стрингСиммиларити
        post: `INSERT INTO usercart(name, price,quantity,image) VALUES(?,?,?,?)`,
        cartclean: `DELETE FROM usercart`,
        cart1: `UPDATE usercart SET quantity = quantity + 1`,
        cart0: `UPDATE usercart SET quantity = quantity - 1`//,
        // cartdelone: `UPDATE usercart SET `
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
const { post } = require('request');
var TmplPath = '.';
nunjucks.configure(TmplPath, {
    autoescape: true,
    express: app
});
var env = nunjucks.configure(".", { autoescape: false });
// var cart = [];
// Роуты для сайта

// app.get('',function(req, res){ something here }) <--- Гет запрос 

////////////////////////////////////
///////////////header///////////////
////////////////////////////////////
app.get('/', function (request, response) {
    let item = require(__dirname + '/json/TovarTypes.json');
    get_data("categoryes", []).then((resolve) => {
        // console.log({ resolve })
        // response.render(__dirname + '/templates/index.html', { item, resolve });
    }).then(() => {
        get_data("cart", []).then((resolve) => {
            resolve = JSON.stringify(resolve)
            resolve = JSON.parse(resolve)
            response.render(__dirname + '/templates/index.html', { item, resolve });
            // console.log({ resolve })

            // console.log(JSON.parse(resolve))
        })
    })
});

app.get('/catalog/', function (request, response) {
    // let json = require(__dirname + '/json/TovarTypes.json');
    // response.render(__dirname + '/templates/catalog.html', json);
    // let item = require(__dirname + '/json/TovarTypes.json');

    get_data("categoryes", []).then((resolve) => {
        // console.log({ resolve })
        var categories = resolve;
        get_data("cart", []).then((resolve) => {
            response.render(__dirname + '/templates/catalog.html', { resolve, categories });

        })

    })
});


app.get('/catalog/search', (request, response) => {
    const search = request.query.search;
    let SearchedList = [];
    get_data("search", []).then((resolve) => {
        const data = { resolve };
        // console.log(data);
        for (let i = 0, l = data.resolve.length; i < l; i++) {
            var obj = data.resolve[i];
            var similarity = stringSimilarity.compareTwoStrings(String(search.toLowerCase()), obj.name.toLowerCase())
            if (similarity >= 0.2) {
                // console.log(obj.name, 'Сходство(name):', similarity)
                SearchedList.push(obj)
            }
        }
        for (let i = 0, l = data.resolve.length; i < l; i++) {
            var obj = data.resolve[i];
            var similarity = stringSimilarity.compareTwoStrings(String(search.toLowerCase()), obj.company.toLowerCase())
            if (similarity >= 0.8) {
                // console.log(obj.company, 'Сходство(company):', similarity)
                SearchedList.push(obj)
            }
        }
        // console.log({resolve})
        response.render(__dirname + '/templates/Catalog-Searched.html', { SearchedList, resolve, search, cart });

    })

})

app.get('/:userId/favorites', function (request, response) {
    userId = request.params["userId"]
    let json = require(__dirname + '/json/cart.json');
    response.render(__dirname + "/templates/favorites.html", json);
});
app.get('/:userId/cart', function (request, response) {
    userId = request.params["userId"]
    get_data("cart", []).then((resolve) => {
        // console.log({ resolve })
        response.render(__dirname + "/templates/cart.html", { resolve });
    })
})
app.get("/order", function (request, response) {
    get_data("cart", []).then((resolve) => {
        // console.log({ resolve })
        let Tlist = resolve
        response.render(__dirname + "/templates/order.html", { resolve });// роут на страницу оформления заказа //потом
    })
})
app.get("/order/ready", function (request, response) {
    let OrderOpt = request.body;
    get_data("all", []).then((resolve) => {
        console.log({ OrderOpt })
        response.render(__dirname + "/templates/order-ready.html", { OrderOpt, resolve });// роут на страницу оформления заказа //потом
    }).then(() => { var cart = []; console.log() })
    // console.log(request.body)
    // response.render(__dirname + "/templates/order-ready.html", request.body);

})
app.post("/order/ready", function (request, response) {
    //после оформленного заказа очистит корзину
    let OrderOpt = request.body;
    let Name = request.body['name'];
    let price = request.body['price'];
    let image = request.body['image'];
    let quantity = 1;
    get_data("all", []).then((resolve) => {
        var Tlist = resolve
        get_data("cart", []).then((resolve) => {
            response.render(__dirname + '/templates/order-ready.html', { resolve, Tlist });
        })
        // let Tlist = resolve
        // response.render(__dirname + "/templates/order-ready.html", { OrderOpt, Tlist, resolve });// );// роут на страницу оформления заказа //потом
    }).then(() => {
        get_data("cartclean", []).then((resolve) => {
            // response.render(__dirname + "/templates/order-ready.html", { OrderOpt, resolve, cart });// );// роут на страницу оформления заказа //потом
        })
    })
})
app.post('/cartdelete',function(req, res){
    get_data("cartclean", []).then((resolve) => {
        // response.render(__dirname + "/templates/order-ready.html", { OrderOpt, resolve, cart });// );// роут на страницу оформления заказа //потом
        res.redirect("/id/cart")
    })
})
app.post('/catalog/:catalogId/:category', function (request, response) {
    catalogId = request.params["catalogId"];
    category = request.params["category"];
    let Name = request.body['name'];
    let price = request.body['price'];
    let image = request.body['image'];
    let quantity = 1;
    get_data("post", [Name, price, quantity, image]).then((resolve) => {
        // console.log({ resolve })
        var Tlist = resolve
        get_data("cart", []).then((resolve) => {
            // response.render(__dirname + '/templates/index.html', { resolve, Tlist });
            // response.redirect("/:userid/cart")
            response.redirect("#")
        })
    })
    // .then(() => {
    //     get_data("cart", []).then((resolve) => {
    //         resolve = JSON.stringify(resolve)
    //         resolve = JSON.parse(resolve)
    //         // response.render(__dirname + '/templates/TovarsPage.html', { resolve })
    //         // console.log({ resolve })

    //         // console.log(JSON.parse(resolve))
    //     })
    // })
})
app.get('/catalog/:catalogId/:category+#', function (request, response) {
    catalogId = request.params["catalogId"]
    category = request.params["category"]
    let data = request.body
    get_data("all", []).then((resolve) => {
        // console.log({ data })
        response.render(__dirname + '/templates/TovarsPage.html', { resolve, data, cart });
    })
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


// app.post('/catalog/:catalogId/:category', function (request, response) {
//     catalogId = request.params["catalogId"]
//     category = request.params["category"]
//     get_data("all", []).then((resolve) => {
//         // console.log({ resolve })
//         response.render(__dirname + '/templates/TovarsPage.html', { resolve });
//     })
// })
app.get('/catalog/:catalogId/:category', function (request, response) {
    catalogId = request.params["catalogId"]
    category = request.params["category"]
    if (category == "motherboards") {
        get_data("MOBO", []).then((resolve) => {
            var Tlist = resolve
            get_data("cart", []).then((resolve) => {
                response.render(__dirname + '/templates/TovarsPage.html', { resolve, Tlist });
            })
            // console.log({ resolve })

        })
    } else if (category == "ram") {
        get_data("RAM", []).then((resolve) => {
            // let name = localStorage.setItem("name","aaaa")
            // let data = localStorage.getItem("name")
            // console.log({ data })
            var Tlist = resolve
            get_data("cart", []).then((resolve) => {
                response.render(__dirname + '/templates/TovarsPage.html', { resolve, Tlist });
            })
        })
    } else if (category == "processors" || category == "CPU") {
        get_data("CPU", []).then((resolve) => {
            // console.log({ resolve })
            var Tlist = resolve
            get_data("cart", []).then((resolve) => {
                response.render(__dirname + '/templates/TovarsPage.html', { resolve, Tlist });
            })
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
            var Tlist = resolve
            get_data("cart", []).then((resolve) => {
                response.render(__dirname + '/templates/TovarsPage.html', { resolve, Tlist });
            })
        })
        // response.render(__dirname + '/templates/TovarsPage.html');
    }


});
app.post('/cartplusone',function(req, res){
    let quantity = req.body["quantity"];
    get_data("cart1", []).then((resolve) => {
        res.redirect('/id/cart')
    })
})
app.post('/cartminusone',function(req, res){
    let quantity = req.body;
    get_data("cart0", []).then((resolve) => {
        res.redirect('/id/cart')
    })
})
app.post("/catalog/search", function (req, res) {
    const search = request.query.search;
    get_data("search", [search]).then((resolve) => {
        var Tlist = resolve
        get_data("cart", []).then((resolve) => {
            response.render(__dirname + '/templates/Catalog-Searched.html.html', { resolve, Tlist });
        })
        // res.render(__dirname + '/templates/Catalog-Searched.html', { cart });
    })
    // res.render(__dirname+"templates/MiniCartCard.html")
})
app.post('/catalog/:catalogId/:category', function (req, res) {
    catalogId = req.params["catalogId"]
    category = req.params["category"]
    let data = req.body;
    // cart.push(data)
    get_data("all", []).then((resolve) => {
        // console.log({cart})//При каждом нажатии на кнопку 'купить' пушить объект в корзину
        var Tlist = resolve;
        get_data("cart", []).then((resolve) => {
            response.render(__dirname + '/templates/TovarsPage.html', { resolve, Tlist });
        })
        // res.render(__dirname + '/templates/TovarsPage.html', { resolve, data});
    })

})
app.get("/catalog/miniCart", function (req, res) {
    get_data("cart", []).then((resolve) => {
        let data = req.body;
        let storage = req.cookies
        res.render(__dirname + '/templates/TovarsPage.html', { data, storage, cart });
    })


    // res.render(__dirname + '/templates/TovarsPage.html', { cart });

})
app.use(function (req, res) {
    res.status(404).render(__dirname + '/404.html');
});
///////////The end///////////////////
///Все остальные страницы каталога///
///////////The end///////////////////

app.listen(port, function () {
    console.log(`Server stated on: http://${hostname}:${port}`)
});

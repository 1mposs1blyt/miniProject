const express = require('express');
const app = express();
const sqlite = require('sqlite3');
const nunjucks = require('nunjucks'); const port = 3000;
var TmplPath = '.';
nunjucks.configure(TmplPath, {
    autoescape: true,
    express: app
});


app.use(express.static(__dirname + '/public/static'));

async function get_data(query, data_query) {
    let db = new sqlite.Database("TestDatabase.db", (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("connect to db complete!");
        }
    });

    let sql_queries = {
        all: "SELECT * FROM Goods"//,
        // search: "SELECT * FROM users WHERE name = ?"
    }
    let sql = sql_queries[query];

    //let sql = "SELECT * FROM users";

    let promise = new Promise((resolve, rejece  ) => {
        db.all(sql, data_query, (err, rows) => {
            if (err) {
                rej(err);
            } else {
                resolve(rows)
            }
        });
    })

    let data = await promise;
    db.close();
    return data;
}
app.get('/', function (request, response) {
    response.clearCookie('SearchedList')
    let json = require(__dirname + '/json/TovarTypes.json');
    response.render(__dirname + '/nunjucks/index.njk', json);

});
app.get('/1', (req, res) => {
    let search = req.query.search;
    get_data("all", []).then((resolve) => {
        console.log({resolve})
        res.render(__dirname + '/index.njk', {resolve});
    })
});

app.get('/search', (req, res) => {
    let query_data = Object.values(req.query);
    get_data("search", query_data).then((data) => {
        let person = {
            tagname: Object.keys(data[0]),
            alldate: data
        }

        res.render('index.hbs', person);
    });
})



app.get('/catalog/search', (request, response) => {
    // var search = request.query.search;
    const data = require(__dirname + '/json/TovarTypes.json');

    get_data("all", []).then((data) => {
        let person = {
            // tagname : Object.keys(data[0]),
            alldate: data
        }

        response.render(__dirname + '/index.njk', res)
    })
})

app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
})
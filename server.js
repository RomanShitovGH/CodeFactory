const DBService = require("./DBService.js");
const ejs = require("ejs");
const express = require('express');
const app = express();
const fs = require('fs');
const staticMiddleware = express.static("public");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const SECRET = "Любая строка со случайным набором символов";

function serveSPA(req, res) {
    const spa = fs.readFileSync("public/spa.html");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(spa.toString()); 
}

function serveProducts(req, res) { 
    DBService.getProducts(req.query)
    .then( products => {
        if (products) {
            res.json(products); 
        } else {
            res.json({});    
        }
    })
    .catch( err => {
        serveInternalError(req, res);
    })    
}

function serveOneProduct(req, res) { 
    if (req.query.key) {
        DBService.getProductByKey(req.query)
            .then( (product) => {
                if (product) {
                    res.json(product);
                }
            })
            .catch( err => {
                serveInternalError(req, res);
            })
    } else if (req.query.slug) {
        DBService.getProductBySlug(req.query)
            .then( (product) => {
                if (product) {
                    res.json(product); 
                }
            })
            .catch( err => {
                serveInternalError(req, res);
            })  
    } else if (req.query.id) {
        DBService.getProductById(req.query)
        .then( (product) => {
            if (product) {
                res.json(product); 
            }
        })
        .catch( err => {
            serveInternalError(req, res);
        })
    }
       
}

function serveInternalError(req, res) {
    let scope;
    const file = fs.readFileSync("public/notFound.ejs").toString();;
    const template = ejs.compile(file);
    scope = { product: {customText: "Ошибка в идентификаторе товара. Ответ сервера: 500"} };
    const body = template(scope);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html; charset=utf-8"); 
    res.write(body);
    res.end();
}

function serveLogin(req, res) {
    const userEmail = "123@yandex.ru";
    const payload = {
        email: userEmail
    };
    const token = jwt.sign(payload, SECRET, {
        expiresIn: "1m"
    });
    res.status(200)
       .cookie('token', token, { Path: '/', encode: String});
    res.end();
}

DBService.init();

app.use(bodyParser.json() );
app.use(cookieParser());
app.use(staticMiddleware);
app.get('/', serveSPA);
app.get('/product/:product', serveSPA);
app.get('/panel', serveSPA);
app.get('/panel/product', serveSPA);
app.get('/panel/product/:id', serveSPA);
app.get('/api/products', serveProducts);
app.get('/api/product?:key_slug', serveOneProduct);
app.get('/api/login', serveLogin);
app.get('/api/login2', function (req, res) {
    const cookie = req.cookies.user;
    if (cookie === undefined) {
        res.status(200)
           .cookie('user', '444@yandex.ru', { Path: '/', encode: String});
    };
    res.end();   
});

app.get('/api/me', async function (req, res) {
    try {
        const payload = jwt.verify(req.cookies.token, SECRET);
        if (payload) {
            const user = await DBService.getUserByEmail(payload.email);
            if (user) {
                res.status(200).json(user);        
            } else {
                res.status(500).json("Статус 500. Пользователь не найден");
            } 
        } else {
            throw new Error('ошибка!');
        }
    } catch(error) {
        res.status(403).json("Статус 403 Forbidden (доступ запрещен)");
    }
    res.end();       
});
 

app.put("/api/product/:id", function(req, res) {
    DBService.updateProduct(req.params.id, req.body)
    .then(result => {
        res.json(result);
    })
    .catch( err => {
        serveInternalError(req, res, err.message);
    });  
});

app.post("/api/product", function(req, res) {
    DBService.addProduct(req.body)
      .then(result => {
          res.json(result.ops[0]);
      })
      .catch( err => {
          serveInternalError(req, res, err.message);
      });  
  });


app.get('/*', serveSPA);

app.listen(3000); //3000 process.env.PORT
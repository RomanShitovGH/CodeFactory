const ProductService = require("./ProductService.js");
const ejs = require("ejs");
const express = require('express');
const app = express();
const fs = require('fs');
const staticMiddleware = express.static("public");
const bodyParser = require('body-parser');


function serveSPA(req, res) {
    const spa = fs.readFileSync("public/spa.html");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(spa.toString()); 
}

function serveProducts(req, res) { 
    ProductService.getProducts(req.query)
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
        ProductService.getProductByKey(req.query)
            .then( (product) => {
                if (product) {
                    res.json(product);
                }
            })
            .catch( err => {
                serveInternalError(req, res);
            })
    } else if (req.query.slug) {
        ProductService.getProductBySlug(req.query)
            .then( (product) => {
                if (product) {
                    res.json(product); 
                }
            })
            .catch( err => {
                serveInternalError(req, res);
            })  
    } else if (req.query.id) {
        ProductService.getProductById(req.query)
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
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Set-Cookie", "user=123@yandex.ru; Path=/ ");
    //res.cookie('name', '123@yandex.ru');
    res.end();
}

ProductService.init();

app.get('/', serveSPA);
app.get('/product/:product', serveSPA);
app.get('/panel', serveSPA);
app.get('/panel/product', serveSPA);
app.get('/panel/product/:id', serveSPA);
app.get('/api/products', serveProducts);
app.get('/api/product?:key_slug', serveOneProduct);
app.get('/api/login', serveLogin);


app.use(bodyParser.json()); 

app.put("/api/product/:id", function(req, res) {
  ProductService.updateProduct(req.params.id, req.body)
    .then(result => {
        res.json(result);
    })
    .catch( err => {
        serveInternalError(req, res, err.message);
    });  
});

app.post("/api/product", function(req, res) {
    ProductService.addProduct(req.body)
      .then(result => {
          res.json(result.ops[0]);
      })
      .catch( err => {
          serveInternalError(req, res, err.message);
      });  
  });

app.use(staticMiddleware);
app.get('/*', serveSPA);

app.listen(3000); //3000 process.env.PORT
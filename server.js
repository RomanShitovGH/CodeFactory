const ProductService = require("./ProductService.js");
const ejs = require("ejs");
const express = require('express');
const app = express();
const fs = require('fs');
const staticMiddleware = express.static("public");

function serveSPA(req, res) {
    const spa = fs.readFileSync("public/spa.html");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(spa.toString()); 
}

function serveProducts(req, res) { 
    ProductService.getProducts()
    .then( products => {
        if (products) {
            res.json(products); 
        }
    })
    .catch( err => {
        serveInternalServerError(req, res, err.message);
    })    
}

function serveOneProduct(req, res) { 
    ProductService.getProductByKeySlug(req.query)
    .then( (product) => {
        if (product) {
            res.json(product); 
        } else {
            serveInternalServerError(req, res);
        }
    })
    .catch( err => {
        serveInternalServerError(req, res, err.message);
    })   
}

function serveNotFound(req, res) {
    let scope;
    const file = fs.readFileSync("public/notFound.ejs").toString();
    const template = ejs.compile(file);
    scope = { product: {customText: "Введенная вами страница на сайте не обнаружена"} };    
    const body = template(scope);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8"); 
    res.write(body);
    res.end();
}

function serveInternalServerError(req, res) {
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
   
ProductService.init();

app.get('/', serveSPA);
app.get('/product/:product', serveSPA);
app.get('/api/products', serveProducts);
app.get('/api/product?:key_slug', serveOneProduct);

app.use(staticMiddleware);

app.use(serveNotFound);

app.listen(process.env.PORT); //3000 process.env.PORT
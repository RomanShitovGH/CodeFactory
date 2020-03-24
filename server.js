const ProductService = require("./ProductService.js");

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const ejs = require("ejs");
const http = require('http');
const path = require('path');
const fs = require('fs');

function handler(req, res) {
    const URL = require("url");
    const parsedURL = URL.parse(req.url);
    
    if (path.extname(path.basename(req.url))) {
        serveStatic(req, res, path.basename(req.url))    
    } else if ((parsedURL.pathname.indexOf("/product/") === 0) || (path.basename(req.url) === "") ) {
        serveSPA(req, res);
    } else if ((parsedURL.pathname.indexOf("/api/products") === 0)) {
        serveAPI(req, res);
    } else {
        serveNotFound(req, res)
    }   
}

function serveStatic(req, res, customFileName, pathname) {
    const extension = path.extname(customFileName);
    res.statusCode = 200;
    fs.readFile("public/" + customFileName, function (err, data) {
        if (err) return serveNotFound(req, res);
        
        const body = data;
        switch (extension) {
        case '.css':
            res.setHeader("Content-Type", "text/css; charset=utf-8");
            res.write(body);
            res.end();
            break;
        case ".png":
            res.setHeader("Content-Type", "text/png; charset=utf-8");
            res.write(body);
            res.end();
            break;
        case ".jpg":
            res.setHeader("Content-Type", "text/jpg; charset=utf-8");
            res.write(body);
            res.end();
            break;
        case ".js":
            res.setHeader("Content-Type", "application/javascript; charset=utf-8");
            res.write(body);
            res.end();
            break;
        }
    })
}

function serveSPA(req, res) {
    const spa = fs.readFileSync("public/spa.html");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(spa.toString());
}

function serveAPI(req, res) {
    const stroka = req.url.slice(1);
    const splitURL = stroka.split('/');
    if (splitURL.length > 2) {
        const id = splitURL[2];    
        ProductService.findById(id)
            .then( result => {   
                if (result) { 
                    const body = JSON.stringify(result);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.write(body);
                    res.end();     
                } else {
                    serveNotFound(req, res, "Введенный вами товар не найден");
                }     
            })
            .catch( err => {
                serveInternalServerError(req, res, err.message);
            })
    } else {
        ProductService.getProducts()
        .then( result => {
            if (result) {
                const body = JSON.stringify(result);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.write(body);
                res.end();
            }
        });
    } 
}

function serveNotFound(req, res, customText) {
    let scope;
    const file = fs.readFileSync("public/index.html").toString();;
    const template = ejs.compile(file);
    
    if (customText) {
        scope = { products: {customText: customText} };
    } else {
        scope = { products: {customText: "Введенная вами страница на сайте не обнаружена"} };
    }
    
    const body = template(scope);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8"); 
    res.write(body);
    res.end();
}

function serveInternalServerError(req, res, customText) {
    let scope;
    const file = fs.readFileSync("public/index.html").toString();;
    const template = ejs.compile(file);
    
    scope = { products: {customText: "Ошибка в идентификаторе товара. Ответ сервера: 500"} };
    const body = template(scope);
    
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html; charset=utf-8"); 
    res.write(body);
    res.end();
}


ProductService.init();

const server = http.createServer(handler);

server.listen(process.env.PORT); //3000
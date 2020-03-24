{"filter":false,"title":"server.js","tooltip":"/server.js","undoManager":{"mark":4,"position":4,"stack":[[{"start":{"row":130,"column":0},"end":{"row":130,"column":1},"action":"insert","lines":[" "],"id":175}],[{"start":{"row":130,"column":1},"end":{"row":130,"column":2},"action":"insert","lines":[" "],"id":177}],[{"start":{"row":82,"column":21},"end":{"row":82,"column":40},"action":"remove","lines":["InternalServerError"],"id":178,"ignore":true},{"start":{"row":82,"column":21},"end":{"row":82,"column":29},"action":"insert","lines":["NotFound"]},{"start":{"row":98,"column":14},"end":{"row":104,"column":0},"action":"remove","lines":["NotFound(req, res, customText) {","    let scope;","    const file = fs.readFileSync(\"public/index.html\").toString();;","    const template = ejs.compile(file);","    ","    if (customText) {",""]},{"start":{"row":98,"column":14},"end":{"row":152,"column":4},"action":"insert","lines":["Index(req, res, customFileName) {","    ProductService.getProducts()","        .then( result => {","            if (result) {","                const file = fs.readFileSync(\"public/\" + customFileName).toString();","                const scope = { products: result };","                const template = ejs.compile(file);","                const body = template(scope);","                res.statusCode = 200;","                res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\");","                res.write(body);","                res.end();","            }","        });     ","}","","function serveProduct(req, res, customFileName, productUrl) {","    const partsURL = productUrl.replace(\"/product/\", \"\").split(\"-\");","    ProductService.getProductByKey(partsURL[0])","        .then( result => {","            if (result === null) {","                serveNotFound(req, res, \"Введенный вами товар не найден\")","            } else { ","                const file = fs.readFileSync(\"public/\" + customFileName).toString();","                const slugURL = productUrl.replace(\"/product/\", \"\").slice(partsURL[0].length + 1);","                const template = ejs.compile(file);","                const scope = { product: result };","                const body = template(scope);","                    ","                if (slugURL != result.slug) {","                    res.statusCode = 301;","                    res.setHeader(\"Location\", `/product/+${partsURL[0]}-${result.slug}`);","                } else {","                    res.statusCode = 200;","                    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\");    ","                }","                    ","                res.write(body);","                res.end();","                    ","            }","        })","}","","function serveNotFound(req, res, customText) {","    let scope;","    const file = fs.readFileSync(\"public/index.html\").toString();;","    const template = ejs.compile(file);","    ","    if (customText) {","        if (customText === \"500\") {","            scope = { products: {customText: \"Ошибка в идентификаторе товара. Ответ сервера: 500\"} };","            res.statusCode = 500;","        } else {","    "]},{"start":{"row":153,"column":0},"end":{"row":155,"column":0},"action":"insert","lines":["            res.statusCode = 200;","        } ",""]},{"start":{"row":157,"column":0},"end":{"row":158,"column":0},"action":"insert","lines":["        res.statusCode = 200;",""]},{"start":{"row":161,"column":0},"end":{"row":162,"column":0},"action":"remove","lines":["    res.statusCode = 200;",""]},{"start":{"row":166,"column":0},"end":{"row":180,"column":2},"action":"remove","lines":["function serveInternalServerError(req, res, customText) {","    let scope;","    const file = fs.readFileSync(\"public/index.html\").toString();;","    const template = ejs.compile(file);","    ","    scope = { products: {customText: \"Ошибка в идентификаторе товара. Ответ сервера: 500\"} };","    const body = template(scope);","    ","    res.statusCode = 500;","    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); ","    res.write(body);","    res.end();","}","  ","  "]}],[{"start":{"row":0,"column":0},"end":{"row":171,"column":39},"action":"remove","lines":["const ProductService = require(\"./ProductService.js\");","","const MongoClient = require('mongodb').MongoClient;","const ObjectID = require('mongodb').ObjectID;","","const ejs = require(\"ejs\");","const http = require('http');","const path = require('path');","const fs = require('fs');","","function handler(req, res) {","    const URL = require(\"url\");","    const parsedURL = URL.parse(req.url);","    ","    if (path.extname(path.basename(req.url))) {","        serveStatic(req, res, path.basename(req.url))    ","    } else if ((parsedURL.pathname.indexOf(\"/product/\") === 0) || (path.basename(req.url) === \"\") ) {","        serveSPA(req, res);","    } else if ((parsedURL.pathname.indexOf(\"/api/products\") === 0)) {","        serveAPI(req, res);","    } else {","        serveNotFound(req, res)","    }   ","}","","function serveStatic(req, res, customFileName, pathname) {","    const extension = path.extname(customFileName);","    res.statusCode = 200;","    fs.readFile(\"public/\" + customFileName, function (err, data) {","        if (err) return serveNotFound(req, res);","        ","        const body = data;","        switch (extension) {","        case '.css':","            res.setHeader(\"Content-Type\", \"text/css; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        case \".png\":","            res.setHeader(\"Content-Type\", \"text/png; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        case \".jpg\":","            res.setHeader(\"Content-Type\", \"text/jpg; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        case \".js\":","            res.setHeader(\"Content-Type\", \"application/javascript; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        }","    })","}","","function serveSPA(req, res) {","    const spa = fs.readFileSync(\"public/spa.html\");","    res.statusCode = 200;","    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\");","    res.end(spa.toString());","}","","function serveAPI(req, res) {","    const stroka = req.url.slice(1);","    const splitURL = stroka.split('/');","    if (splitURL.length > 2) {","        const id = splitURL[2];    ","        ProductService.findById(id)","            .then( result => {   ","                if (result) { ","                    const body = JSON.stringify(result);","                    res.statusCode = 200;","                    res.setHeader(\"Content-Type\", \"application/json\");","                    res.write(body);","                    res.end();     ","                } else {","                    serveNotFound(req, res, \"Введенный вами товар не найден\");","                }     ","            })","            .catch( err => {","                serveNotFound(req, res, err.message);","            })","    } else {","        ProductService.getProducts()","        .then( result => {","            if (result) {","                const body = JSON.stringify(result);","                res.statusCode = 200;","                res.setHeader(\"Content-Type\", \"application/json\");","                res.write(body);","                res.end();","            }","        });","    } ","}","","function serveIndex(req, res, customFileName) {","    ProductService.getProducts()","        .then( result => {","            if (result) {","                const file = fs.readFileSync(\"public/\" + customFileName).toString();","                const scope = { products: result };","                const template = ejs.compile(file);","                const body = template(scope);","                res.statusCode = 200;","                res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\");","                res.write(body);","                res.end();","            }","        });     ","}","","function serveProduct(req, res, customFileName, productUrl) {","    const partsURL = productUrl.replace(\"/product/\", \"\").split(\"-\");","    ProductService.getProductByKey(partsURL[0])","        .then( result => {","            if (result === null) {","                serveNotFound(req, res, \"Введенный вами товар не найден\")","            } else { ","                const file = fs.readFileSync(\"public/\" + customFileName).toString();","                const slugURL = productUrl.replace(\"/product/\", \"\").slice(partsURL[0].length + 1);","                const template = ejs.compile(file);","                const scope = { product: result };","                const body = template(scope);","                    ","                if (slugURL != result.slug) {","                    res.statusCode = 301;","                    res.setHeader(\"Location\", `/product/+${partsURL[0]}-${result.slug}`);","                } else {","                    res.statusCode = 200;","                    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\");    ","                }","                    ","                res.write(body);","                res.end();","                    ","            }","        })","}","","function serveNotFound(req, res, customText) {","    let scope;","    const file = fs.readFileSync(\"public/index.html\").toString();;","    const template = ejs.compile(file);","    ","    if (customText) {","        if (customText === \"500\") {","            scope = { products: {customText: \"Ошибка ���� идентификаторе товара. Ответ сервера: 500\"} };","            res.statusCode = 500;","        } else {","            scope = { products: {customText: customText} };","            res.statusCode = 200;","        } ","    } else {","        scope = { products: {customText: \"Введенная вами страница на сайте не обнаружена\"} };","        res.statusCode = 200;","    }","    ","    const body = template(scope);","    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); ","    res.write(body);","    res.end();","}","","","ProductService.init();","","const server = http.createServer(handler);","","server.listen(process.env.PORT); //3000"],"id":179},{"start":{"row":0,"column":0},"end":{"row":171,"column":39},"action":"insert","lines":["const ProductService = require(\"./ProductService.js\");","","const MongoClient = require('mongodb').MongoClient;","const ObjectID = require('mongodb').ObjectID;","","const ejs = require(\"ejs\");","const http = require('http');","const path = require('path');","const fs = require('fs');","","function handler(req, res) {","    const URL = require(\"url\");","    const parsedURL = URL.parse(req.url);","    ","    if (path.extname(path.basename(req.url))) {","        serveStatic(req, res, path.basename(req.url))    ","    } else if ((parsedURL.pathname.indexOf(\"/product/\") === 0) || (path.basename(req.url) === \"\") ) {","        serveSPA(req, res);","    } else if ((parsedURL.pathname.indexOf(\"/api/products\") === 0)) {","        serveAPI(req, res);","    } else {","        serveNotFound(req, res)","    }   ","}","","function serveStatic(req, res, customFileName, pathname) {","    const extension = path.extname(customFileName);","    res.statusCode = 200;","    fs.readFile(\"public/\" + customFileName, function (err, data) {","        if (err) return serveNotFound(req, res);","        ","        const body = data;","        switch (extension) {","        case '.css':","            res.setHeader(\"Content-Type\", \"text/css; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        case \".png\":","            res.setHeader(\"Content-Type\", \"text/png; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        case \".jpg\":","            res.setHeader(\"Content-Type\", \"text/jpg; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        case \".js\":","            res.setHeader(\"Content-Type\", \"application/javascript; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        }","    })","}","","function serveSPA(req, res) {","    const spa = fs.readFileSync(\"public/spa.html\");","    res.statusCode = 200;","    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\");","    res.end(spa.toString());","}","","function serveAPI(req, res) {","    const stroka = req.url.slice(1);","    const splitURL = stroka.split('/');","    if (splitURL.length > 2) {","        const id = splitURL[2];    ","        ProductService.findById(id)","            .then( result => {   ","                if (result) { ","                    const body = JSON.stringify(result);","                    res.statusCode = 200;","                    res.setHeader(\"Content-Type\", \"application/json\");","                    res.write(body);","                    res.end();     ","                } else {","                    serveNotFound(req, res, \"Введенный вами товар не найден\");","                }     ","            })","            .catch( err => {","                serveNotFound(req, res, err.message);","            })","    } else {","        ProductService.getProducts()","        .then( result => {","            if (result) {","                const body = JSON.stringify(result);","                res.statusCode = 200;","                res.setHeader(\"Content-Type\", \"application/json\");","                res.write(body);","                res.end();","            }","        });","    } ","}","","function serveIndex(req, res, customFileName) {","    ProductService.getProducts()","        .then( result => {","            if (result) {","                const file = fs.readFileSync(\"public/\" + customFileName).toString();","                const scope = { products: result };","                const template = ejs.compile(file);","                const body = template(scope);","                res.statusCode = 200;","                res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\");","                res.write(body);","                res.end();","            }","        });     ","}","","function serveProduct(req, res, customFileName, productUrl) {","    const partsURL = productUrl.replace(\"/product/\", \"\").split(\"-\");","    ProductService.getProductByKey(partsURL[0])","        .then( result => {","            if (result === null) {","                serveNotFound(req, res, \"Введенный вами товар не найден\")","            } else { ","                const file = fs.readFileSync(\"public/\" + customFileName).toString();","                const slugURL = productUrl.replace(\"/product/\", \"\").slice(partsURL[0].length + 1);","                const template = ejs.compile(file);","                const scope = { product: result };","                const body = template(scope);","                    ","                if (slugURL != result.slug) {","                    res.statusCode = 301;","                    res.setHeader(\"Location\", `/product/+${partsURL[0]}-${result.slug}`);","                } else {","                    res.statusCode = 200;","                    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\");    ","                }","                    ","                res.write(body);","                res.end();","                    ","            }","        })","}","","function serveNotFound(req, res, customText) {","    let scope;","    const file = fs.readFileSync(\"public/index.html\").toString();;","    const template = ejs.compile(file);","    ","    if (customText) {","        if (customText === \"500\") {","            scope = { products: {customText: \"Ошибка в идентификаторе товара. Ответ сервера: 500\"} };","            res.statusCode = 500;","        } else {","            scope = { products: {customText: customText} };","            res.statusCode = 200;","        } ","    } else {","        scope = { products: {customText: \"Введенная вами страница на сайте не обнаружена\"} };","        res.statusCode = 200;","    }","    ","    const body = template(scope);","    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); ","    res.write(body);","    res.end();","}","","","ProductService.init();","","const server = http.createServer(handler);","","server.listen(process.env.PORT); //3000"]}],[{"start":{"row":0,"column":0},"end":{"row":171,"column":39},"action":"remove","lines":["const ProductService = require(\"./ProductService.js\");","","const MongoClient = require('mongodb').MongoClient;","const ObjectID = require('mongodb').ObjectID;","","const ejs = require(\"ejs\");","const http = require('http');","const path = require('path');","const fs = require('fs');","","function handler(req, res) {","    const URL = require(\"url\");","    const parsedURL = URL.parse(req.url);","    ","    if (path.extname(path.basename(req.url))) {","        serveStatic(req, res, path.basename(req.url))    ","    } else if ((parsedURL.pathname.indexOf(\"/product/\") === 0) || (path.basename(req.url) === \"\") ) {","        serveSPA(req, res);","    } else if ((parsedURL.pathname.indexOf(\"/api/products\") === 0)) {","        serveAPI(req, res);","    } else {","        serveNotFound(req, res)","    }   ","}","","function serveStatic(req, res, customFileName, pathname) {","    const extension = path.extname(customFileName);","    res.statusCode = 200;","    fs.readFile(\"public/\" + customFileName, function (err, data) {","        if (err) return serveNotFound(req, res);","        ","        const body = data;","        switch (extension) {","        case '.css':","            res.setHeader(\"Content-Type\", \"text/css; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        case \".png\":","            res.setHeader(\"Content-Type\", \"text/png; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        case \".jpg\":","            res.setHeader(\"Content-Type\", \"text/jpg; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        case \".js\":","            res.setHeader(\"Content-Type\", \"application/javascript; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        }","    })","}","","function serveSPA(req, res) {","    const spa = fs.readFileSync(\"public/spa.html\");","    res.statusCode = 200;","    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\");","    res.end(spa.toString());","}","","function serveAPI(req, res) {","    const stroka = req.url.slice(1);","    const splitURL = stroka.split('/');","    if (splitURL.length > 2) {","        const id = splitURL[2];    ","        ProductService.findById(id)","            .then( result => {   ","                if (result) { ","                    const body = JSON.stringify(result);","                    res.statusCode = 200;","                    res.setHeader(\"Content-Type\", \"application/json\");","                    res.write(body);","                    res.end();     ","                } else {","                    serveNotFound(req, res, \"Введенный вами товар не найден\");","                }     ","            })","            .catch( err => {","                serveNotFound(req, res, err.message);","            })","    } else {","        ProductService.getProducts()","        .then( result => {","            if (result) {","                const body = JSON.stringify(result);","                res.statusCode = 200;","                res.setHeader(\"Content-Type\", \"application/json\");","                res.write(body);","                res.end();","            }","        });","    } ","}","","function serveIndex(req, res, customFileName) {","    ProductService.getProducts()","        .then( result => {","            if (result) {","                const file = fs.readFileSync(\"public/\" + customFileName).toString();","                const scope = { products: result };","                const template = ejs.compile(file);","                const body = template(scope);","                res.statusCode = 200;","                res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\");","                res.write(body);","                res.end();","            }","        });     ","}","","function serveProduct(req, res, customFileName, productUrl) {","    const partsURL = productUrl.replace(\"/product/\", \"\").split(\"-\");","    ProductService.getProductByKey(partsURL[0])","        .then( result => {","            if (result === null) {","                serveNotFound(req, res, \"Введенный вами товар не найден\")","            } else { ","                const file = fs.readFileSync(\"public/\" + customFileName).toString();","                const slugURL = productUrl.replace(\"/product/\", \"\").slice(partsURL[0].length + 1);","                const template = ejs.compile(file);","                const scope = { product: result };","                const body = template(scope);","                    ","                if (slugURL != result.slug) {","                    res.statusCode = 301;","                    res.setHeader(\"Location\", `/product/+${partsURL[0]}-${result.slug}`);","                } else {","                    res.statusCode = 200;","                    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\");    ","                }","                    ","                res.write(body);","                res.end();","                    ","            }","        })","}","","function serveNotFound(req, res, customText) {","    let scope;","    const file = fs.readFileSync(\"public/index.html\").toString();;","    const template = ejs.compile(file);","    ","    if (customText) {","        if (customText === \"500\") {","            scope = { products: {customText: \"Ошибка в идентификаторе товара. Ответ сервера: 500\"} };","            res.statusCode = 500;","        } else {","            scope = { products: {customText: customText} };","            res.statusCode = 200;","        } ","    } else {","        scope = { products: {customText: \"Введенная вами страница на сайте не обнаружена\"} };","        res.statusCode = 200;","    }","    ","    const body = template(scope);","    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); ","    res.write(body);","    res.end();","}","","","ProductService.init();","","const server = http.createServer(handler);","","server.listen(process.env.PORT); //3000"],"id":180},{"start":{"row":0,"column":0},"end":{"row":135,"column":39},"action":"insert","lines":["const ProductService = require(\"./ProductService.js\");","","const MongoClient = require('mongodb').MongoClient;","const ObjectID = require('mongodb').ObjectID;","","const ejs = require(\"ejs\");","const http = require('http');","const path = require('path');","const fs = require('fs');","","function handler(req, res) {","    const URL = require(\"url\");","    const parsedURL = URL.parse(req.url);","    ","    if (path.extname(path.basename(req.url))) {","        serveStatic(req, res, path.basename(req.url))    ","    } else if ((parsedURL.pathname.indexOf(\"/product/\") === 0) || (path.basename(req.url) === \"\") ) {","        serveSPA(req, res);","    } else if ((parsedURL.pathname.indexOf(\"/api/products\") === 0)) {","        serveAPI(req, res);","    } else {","        serveNotFound(req, res)","    }   ","}","","function serveStatic(req, res, customFileName, pathname) {","    const extension = path.extname(customFileName);","    res.statusCode = 200;","    fs.readFile(\"public/\" + customFileName, function (err, data) {","        if (err) return serveNotFound(req, res);","        ","        const body = data;","        switch (extension) {","        case '.css':","            res.setHeader(\"Content-Type\", \"text/css; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        case \".png\":","            res.setHeader(\"Content-Type\", \"text/png; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        case \".jpg\":","            res.setHeader(\"Content-Type\", \"text/jpg; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        case \".js\":","            res.setHeader(\"Content-Type\", \"application/javascript; charset=utf-8\");","            res.write(body);","            res.end();","            break;","        }","    })","}","","function serveSPA(req, res) {","    const spa = fs.readFileSync(\"public/spa.html\");","    res.statusCode = 200;","    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\");","    res.end(spa.toString());","}","","function serveAPI(req, res) {","    const stroka = req.url.slice(1);","    const splitURL = stroka.split('/');","    if (splitURL.length > 2) {","        const id = splitURL[2];    ","        ProductService.findById(id)","            .then( result => {   ","                if (result) { ","                    const body = JSON.stringify(result);","                    res.statusCode = 200;","                    res.setHeader(\"Content-Type\", \"application/json\");","                    res.write(body);","                    res.end();     ","                } else {","                    serveNotFound(req, res, \"Введенный вами товар не най��е��\");","                }     ","            })","            .catch( err => {","                serveInternalServerError(req, res, err.message);","            })","    } else {","        ProductService.getProducts()","        .then( result => {","            if (result) {","                const body = JSON.stringify(result);","                res.statusCode = 200;","                res.setHeader(\"Content-Type\", \"application/json\");","                res.write(body);","                res.end();","            }","        });","    } ","}","","function serveNotFound(req, res, customText) {","    let scope;","    const file = fs.readFileSync(\"public/index.html\").toString();;","    const template = ejs.compile(file);","    ","    if (customText) {","        scope = { products: {customText: customText} };","    } else {","        scope = { products: {customText: \"Введенная вами страница на сайте не обнаружена\"} };","    }","    ","    const body = template(scope);","    res.statusCode = 200;","    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); ","    res.write(body);","    res.end();","}","","function serveInternalServerError(req, res, customText) {","    let scope;","    const file = fs.readFileSync(\"public/index.html\").toString();;","    const template = ejs.compile(file);","    ","    scope = { products: {customText: \"Ошибка в идентификаторе товара. Ответ сервера: 500\"} };","    const body = template(scope);","    ","    res.statusCode = 500;","    res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); ","    res.write(body);","    res.end();","}","  ","  ","ProductService.init();","","const server = http.createServer(handler);","","server.listen(process.env.PORT); //3000"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":0,"column":0},"end":{"row":0,"column":53},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1585044208397,"hash":"e4df66ede5a65a13e5c87bfb02a2b1f0ad4c6792"}
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
const bcrypt = require("bcrypt");
const saltRounds = 10;


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
    if (req.params.key) {
        DBService.getProductByKey(req.params)
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
    } else if (req.params.id) {
        DBService.getProductById(req.params)
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

async function serveLogin(req, res) {
    let userEmail;
    let userPassword;
    try {
        if (req.body.login) {
            userEmail = req.body.login;
        } else {
            throw new Error('Не указан Логин');
        };
        if (req.body.password) {
            userPassword = req.body.password;
        } else {
            throw new Error('Не указан Пароль');
        }; 
        const user = await DBService.getUserByEmail(userEmail);
        if (user) {
            const result = bcrypt.compareSync(userPassword, user.passwordHash);
            if (result) {   
                const payload = { email: userEmail };
                const token = jwt.sign(payload, SECRET, { expiresIn: "5m" });
                res.status(200)
                    .cookie('token', token, { Path: '/', encode: String});
                res.end();    
            } else {
                throw new Error('Не верна пара Логин/Пароль');
            }         
        } else {
            throw new Error('Не верна пара Логин/Пароль');
        }    
    } catch(error) {
        res.status(403).json("Статус 403 Forbidden (доступ запрещен). " + error);
    }
    
}

async function serveBcrypt(req, res) {
    if (req.query.password) {
        const hash = await bcrypt.hashSync(req.query.password, saltRounds);    
        res.write(hash);  
    }
    res.end();
}

function checkToken(req, res, next) {
    try {
        if (req.cookies.token) {
            const payload = jwt.verify(req.cookies.token, SECRET);        
            req.someData = { processed: true, email: payload.email };
            next();
        } else {
            throw new Error('Ошибка! Необходимо авторизоваться');
        }
    } catch(error) {
        res.status(403).json("Статус 403 Forbidden (доступ запрещен). " + error);    
    }

}

DBService.init();

app.use(bodyParser.json() );
app.use(cookieParser());
app.use(staticMiddleware);
app.get('/', serveSPA);
app.get('/products/:product', serveSPA);
app.get('/panel', checkToken);
app.get('/panel', serveSPA);
app.get('/panel/products', serveSPA);
app.get('/panel/products/:id', serveSPA);

app.get('/api/products/:id', checkToken);
app.get('/api/products/:id', serveOneProduct);

app.get('/api/products/key/:key', serveOneProduct);
app.get('/api/products', serveProducts);

app.get('/api/bcrypt', serveBcrypt);

app.get('/api/me', checkToken);
app.get('/api/me', async function (req, res) {
    try {
        if (req.someData.processed) {
            const user = await DBService.getUserByEmail(req.someData.email);
            if (user) {
                res.status(200).json(user);        
            } else {
                res.status(500).json("Статус 500. Пользователь не найден");
            } 
        } else {
            throw new Error('Ошибка! Необходимо авторизоваться');
        }
    } catch(error) {
        res.status(403).json("Статус 403 Forbidden (доступ запрещен)");
    }
    res.end();       
});
 
app.put('/api/products/:id', checkToken);
app.put('/api/products/:id', function(req, res) {
    DBService.updateProduct(req.params.id, req.body)
    .then(result => {
        res.json(result);
    })
    .catch( err => {
        serveInternalError(req, res, err.message);
    });  
});

app.post('/api/login', serveLogin);

app.post('/api/products', checkToken);
app.post('/api/products', function(req, res) {
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
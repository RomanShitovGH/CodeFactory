const MongoClient = require('mongodb').MongoClient;

let shopDatabase;
let productCollection;

//let products = [];
module.exports = {
  init() {
    MongoClient.connect('mongodb://localhost:27017')
        .then(function (clientInstance) {
            shopDatabase = clientInstance.db("shop");
            productCollection = shopDatabase.collection("product");
        })
  },
  
  getProducts() {
    const cursor = productCollection.find();
    const promise = cursor.toArray();
    return promise;
  },
  
  getProductByKey(kod) {
    const found = shopDatabase.collection("product").findOne({key: Number(kod)}); 
    return found;
  }
  
}
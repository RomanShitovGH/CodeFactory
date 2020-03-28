const MongoClient = require('mongodb').MongoClient;

let shopDatabase;
let productCollection;

module.exports = {
  init() { 
    MongoClient.connect('mongodb://127.0.0.1:27017')
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
  
  getProductByKeySlug(where) {
    if (Object.keys(where).length != 0) {
      if (where.key) {
        const keyProduct = Number(where.key);  
        return productCollection.findOne({ key: keyProduct });
      } else {
        return productCollection.findOne(where);
      }
    }  
  }
}
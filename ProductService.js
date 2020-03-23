const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let shopDatabase;
let productCollection;

module.exports = {
  init() { //mongodb://localhost:27017
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
  
  getProductByKey(kod) {
    const found = shopDatabase.collection("product").findOne({key: Number(kod)}); 
    return found;
  },
  
  findById(id) {
    let mongoId;
    try {
      mongoId = ObjectID(id);
    } catch(err) {
      return Promise.reject(new Error("500"));
    }
    return productCollection.findOne({ _id: mongoId });
  } 
}
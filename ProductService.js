const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

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
  
  getProductByKey(where) {
    if (Object.keys(where).length != 0) {
      try {
        const keyProduct = Number(where.key);  
        return productCollection.findOne({ key: keyProduct });
      } catch(err) {
        return Promise.reject(new Error("500"));
      }
    }  
  },

  getProductBySlug(where) {
    if (Object.keys(where).length != 0) {
      try {
        return productCollection.findOne(where);
      } catch(err) {
        return Promise.reject(new Error("500"));
      }
    }  
  },

  getProductById(where) {
    let mongoId;
    if (Object.keys(where).length != 0) {
      try {
        mongoId = ObjectID(where.id);
        return productCollection.findOne({ _id: mongoId });
      } catch(err) {
        return Promise.reject(new Error("500"));
      }  
      
    } 
  }
}

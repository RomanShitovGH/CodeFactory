const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const omit = require('lodash.omit');

let shopDatabase;
let productCollection;
let userCollection;

module.exports = {
  init() { 
    MongoClient.connect('mongodb://127.0.0.1:27017')
        .then(function (clientInstance) {
            shopDatabase = clientInstance.db("shop");
            productCollection = shopDatabase.collection("product");
            userCollection = shopDatabase.collection("user");

        })
  },
  
  getProducts(where) {
    const cursor = productCollection.find(where);
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
  },

  updateProduct(id, patch) {
    return new Promise (
      async resolve => {
        await productCollection.updateOne(
            { _id: ObjectID(id) },
            { $set: omit(patch, ['_id']) }
          )
        resolve (productCollection.findOne({ _id: ObjectID(id) }));  
      },
      reject => {
        reject (new Error("500"));
      }
    )
  },

  async addProduct(patch) {
    try {
      return await productCollection.insertOne(patch);  
    } catch (error){
      return new Error(error);
    }
  },

  getUserByEmail(userEmail) {
    try {
      return userCollection.findOne({ email: userEmail });  
    } catch (error){
      return new Error(error);
    }
  },

  // getUserByEmailPassword(userEmail, userPasswordHash) {
  //   try {
  //     return userCollection.findOne({ email: userEmail, passwordHash: userPasswordHash });  
  //   } catch (error){
  //     return new Error(error);
  //   }
  // }

}

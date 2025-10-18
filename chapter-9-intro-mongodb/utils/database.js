const mongo = require('mongodb');

const MongoClint = mongo.MongoClient;

const MONGO_URL = 'mongodb+srv://imxsammy:imxsammy@imxsammy.crvkpax.mongodb.net/?retryWrites=true&w=majority&appName=imxsammy';

let _db
const mongoConnect = (callBack) => {
  MongoClint.connect(MONGO_URL).then((clint) => {
    _db = clint.db('airbnb')
    callBack()
  }).catch((err) => {
    console.log('Error While connected to mongodb ', err)
  })
}

const getDB = () => {
  if (!_db) {
    throw new Error('mongo not connected')
  }
  return _db
}

exports.mongoConnect = mongoConnect
exports.getDB = getDB
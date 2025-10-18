const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/database");


exports.Home = class Home {

  constructor(image, houseName, location, price, rating, description, _id) {
    if (_id) {
      this._id = _id
    }
    this.image = image;
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.rating = rating;
    this.description = description;
  }

  save() {
    const db = getDB()
    const updateFeild = {
      image: this.image,
      houseName: this.houseName,
      location: this.location,
      price: this.price,
      rating: this.rating,
      description: this.description
    }
    if (this._id) {
      return db.collection("homes").updateOne({ _id: new ObjectId(String(this._id)) }, { $set: updateFeild })
    } else {
      return db.collection('homes').insertOne(this)
    }
  }

  static fetchAll() {
    const db = getDB()
    return db.collection('homes').find().toArray()
  }

  static findById(id) {
    console.log(id)
    const db = getDB()
    return db.collection('homes').find({ _id: new ObjectId(String(id)) }).next()
  }

  static deleteById(id) {
    const db = getDB()
    return db.collection('homes').deleteOne({ _id: new ObjectId(String(id)) })
  }

}
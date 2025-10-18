const { getDB } = require("../utils/database");

exports.Favourite = class Favourite {

  constructor(homeId) {
    this.homeId = homeId
  }

  save() {
    const db = getDB()
    return db.collection('favourites').findOne({ homeId: this.homeId })
      .then(existingFav => {
        if (!existingFav) {
          return db.collection('favourites').insertOne(this)
        } else {
          return Promise.resolve()
        }
      })
  }

  static getFav() {
    const db = getDB()
    return db.collection('favourites').find().toArray()
  }


  static deleteFavById(deleteId) {
    const db = getDB()
    return db.collection('favourites').deleteOne({ homeId: deleteId })
  }
}
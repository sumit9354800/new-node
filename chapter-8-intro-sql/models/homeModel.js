const db = require('../utils/database');

exports.Home = class Home {

  constructor(image, houseName, location, price, rating, description, id) {
    this.id = id;
    this.image = image;
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.rating = rating;
    this.description = description;
  }

  save() {

    if (this.id) { // update query
      return db.execute(
        `UPDATE homes SET housename=?, price=?, location=?, rating=?, image=?, description=? WHERE id=?`,
        [this.houseName, this.price, this.location, this.rating, this.image, this.description, this.id]
      )
    } else {  // insert query
      return db.execute(
        `INSERT INTO homes (housename, price, location, rating, image, description) VALUES (?, ?, ?, ?, ?, ?)`,
        [this.houseName, this.price, this.location, this.rating, this.image, this.description]
      );
    }

  }

  static fetchAll() {
    return db.execute('SELECT * FROM homes')
  }

  static findById(id) {
    return db.execute('SELECT * FROM homes WHERE id = ?', [id]);
  }

  static deleteById(id) {
    return db.execute('DELETE FROM homes WHERE id = ?', [id]);
  }


}
const fs = require('fs');
const path = require('path');
const { rootDir } = require('../utils/rootDir');

exports.Home = class Home {

  constructor(image, address, price, rating) {
    this.image = image;
    this.address = address;
    this.price = price;
    this.rating = rating;
  }

  save() {
    Home.fetchAll((homeDetails) => {
      homeDetails.push(this);
      const filePath = path.join(rootDir, 'data', 'homeData.json');
      fs.writeFile(filePath, JSON.stringify(homeDetails), (err) => {
        console.log("file writing conclude", err);
      });
    })
  }

  static fetchAll(callBack) {
    const filePath = path.join(rootDir, 'data', 'homeData.json');
    fs.readFile(filePath, (err, data) => {
      if (!err) {
        callBack(!err ? JSON.parse(data) : []);
      }
    })
  }

}
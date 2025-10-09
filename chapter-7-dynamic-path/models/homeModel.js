const fs = require('fs');
const path = require('path');
const { rootDir } = require('../utils/rootDir');

const filePath = path.join(rootDir, 'data', 'homeData.json');

exports.Home = class Home {

  constructor(image, address, price, rating) {
    this.image = image;
    this.address = address;
    this.price = price;
    this.rating = rating;
  }

  save() {
    this.id = Math.random().toString();
    Home.fetchAll((homeDetails) => {
      homeDetails.push(this);
      fs.writeFile(filePath, JSON.stringify(homeDetails), (err) => {
        console.log("file writing conclude", err);
      });
    })
  }

  static fetchAll(callBack) {
    fs.readFile(filePath, (err, data) => {
      if (!err) {
        callBack(!err ? JSON.parse(data) : []);
      }
    })
  }

  static findById(id, callBack) {
    this.fetchAll((homes) => {
      const homeFound = homes.find(home => home.id === id);
      callBack(homeFound)
    })
  }

}
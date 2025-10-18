const fs = require('fs');
const path = require('path');
const { rootDir } = require('../utils/rootDir');

const favPath = path.join(rootDir, 'data', 'favData.json');

exports.Favourite = class Favourite {

  static addToFav(homeId, callBack) {
    Favourite.getFav((fav) => {
      if (fav.includes(homeId)) {
        callBack("Already in favourites");
      } else {
        fav.push(homeId);
        fs.writeFile(favPath, JSON.stringify(fav), callBack)
      }
    })
  }

  static getFav(callBack) {
    fs.readFile(favPath, (err, data) => {
      callBack(!err ? JSON.parse(data) : []);
    })
  }


  static deleteFavById(delHomeId, callBack) {
    this.getFav((homesId) => {
      homesId = homesId.filter(homeId => homeId !== delHomeId);
      fs.writeFile(favPath, JSON.stringify(homesId), callBack)
    })
  }

}
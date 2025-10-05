const { Home } = require("../models/homeModel");

exports.getHome = (req, res, next) => {
  res.render('addHome', { currentPage: 'addhome' });
}


exports.postHome = (req, res, next) => {
  const { image, address, price, rating } = req.body
  const home = new Home(image, address, price, rating);
  home.save();
  res.render('homeAdded', { currentPage: 'details' });
}

exports.getHomePost = (req, res, next) => {
  Home.fetchAll((homeDetails) => {
    res.render('home', { homeDetails, currentPage: 'home' });
  })

}

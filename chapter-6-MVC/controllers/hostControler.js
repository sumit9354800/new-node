const { Home } = require("../models/homeModel");

exports.getHome = (req, res, next) => {
  res.render('host/addHome', { currentPage: 'addhome', title: 'Add Home' });
}
exports.getHostHome = (req, res, next) => {
  res.render('host/host-home-list', { currentPage: 'host-home-list', title: 'host-home' });
}

exports.postHome = (req, res, next) => {
  const { image, address, price, rating } = req.body
  const home = new Home(image, address, price, rating);
  home.save();
  res.render('host/home-added', { currentPage: 'details', title: 'Home Added Successfully' });
}

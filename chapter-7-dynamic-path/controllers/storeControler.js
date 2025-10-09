const { Home } = require("../models/homeModel");

exports.getHomePost = (req, res, next) => {
  Home.fetchAll((homeDetails) => {
    res.render('store/home-list', { homeDetails, currentPage: 'home-list', title: 'Home List' });
  })
}
exports.getHome = (req, res, next) => {
  Home.fetchAll((homeDetails) => {
    res.render('store/index', { homeDetails, currentPage: 'home', title: 'Airbnb Home' });
  })
}
exports.getBooking = (req, res, next) => {
  res.render('store/booking', { currentPage: 'booking', title: 'My Booking Page' });
}
exports.getFavList = (req, res, next) => {
  Home.fetchAll((homeDetails) => {
    res.render('store/fav-list', { homeDetails, currentPage: 'fav-list', title: 'My Favourite' });
  })
}

exports.getFavPost = (req, res, next) => {
  Home.fetchAll((homeDetails) => {
    res.render('store/fav-list', { homeDetails, currentPage: 'fav-list', title: 'My Favourite' });
  })
}
exports.getHomeDetails = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Home.findById(id, (home) => {
    if (!home) {
      console.log("No home found");
      res.redirect('/home-list');
    } else {
      console.log(home)
      res.render('store/home-details', { homeData: home, currentPage: 'home-details', title: 'Home Details' });
    }
  })
}
exports.getReserve = (req, res, next) => {
  res.render('store/reserve', { currentPage: 'reserve', title: 'Reserve' });
}

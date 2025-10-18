const { Favourite } = require("../models/favModel");
const { Home } = require("../models/homeModel");

exports.getHomePost = (req, res, next) => {
  Home.fetchAll().then(([homeDetails, feild]) => {
    res.render('store/home-list', { homeDetails, currentPage: 'home-list', title: 'Home List' });
  })
}

exports.getHome = (req, res, next) => {
  Home.fetchAll().then(([homeDetails, feild]) => {
    res.render('store/index', { homeDetails: homeDetails, currentPage: 'home', title: 'Home airbnb' });
  })
}

exports.getBooking = (req, res, next) => {
  res.render('store/booking', { currentPage: 'booking', title: 'My Booking Page' });
}

exports.getFavList = (req, res, next) => {
  Favourite.getFav((favourite) => {
    Home.fetchAll((homeDetails) => {
      const favouriteHome = homeDetails.filter(detailsId => favourite.includes(detailsId.id));
      res.render('store/fav-list', { homeDetails: favouriteHome, currentPage: 'fav-list', title: 'My Favourite' });
    })
  })
  // })
}

exports.getFavPost = (req, res, next) => {
  Favourite.addToFav(req.body.id, (err) => {
    if (err) {
      console.log('came to favourite ', err);
    } else {
      console.log('Added to favourite');
    }
    res.redirect('/fav-list');
  })
}


exports.getHomeDetails = (req, res, next) => {
  let id = req.params.id
  Home.findById(id).then(([homes]) => {
    const home = homes[0];
    console.log(homes)
    if (!home) {
      console.log("No home found");
      res.redirect('/host/host-home');
    } else {
      res.render('store/home-details', { homeData: home, currentPage: 'home-list', title: 'home Details' });
    }
  })
}
exports.getReserve = (req, res, next) => {
  res.render('store/reserve', { currentPage: 'reserve', title: 'Reserve' });
}
exports.deleteFav = (req, res, next) => {
  let id = req.params.id;
  Favourite.deleteFavById(id, (err) => {
    if (err) {
      console.log('Error in deleting', err);
    }
    res.redirect('/fav-list');
    console.log('Deleted from favourite', id);
  })
}
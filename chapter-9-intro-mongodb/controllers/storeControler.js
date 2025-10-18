const { Favourite } = require("../models/favModel");
const { Home } = require("../models/homeModel");

exports.getHomePost = (req, res, next) => {
  Home.fetchAll().then((homeDetails) => {
    res.render('store/home-list', { homeDetails, currentPage: 'home-list', title: 'Home List' });
  })
}

exports.getHome = (req, res, next) => {
  Home.fetchAll().then((homeDetails) => {
    res.render('store/index', { homeDetails: homeDetails, currentPage: 'home', title: 'Home airbnb' });
  })
}

exports.getBooking = (req, res, next) => {
  res.render('store/booking', { currentPage: 'booking', title: 'My Booking Page' });
}

exports.getFavList = (req, res, next) => {
  Favourite.getFav().then(favourite => {
    favourite = favourite.map(favId => favId.homeId)
    Home.fetchAll().then(homeDetails => {
      // console.log(favourite, homeDetails)
      const favouriteHome = homeDetails.filter(detailsId => favourite.includes(detailsId._id.toString()));
      res.render('store/fav-list', { homeDetails: favouriteHome, currentPage: 'fav-list', title: 'My Favourite' });
    })
  })
  // })
}

exports.getFavPost = (req, res, next) => {
  const homeId = req.body.homeId
  const fav = new Favourite(homeId)
  fav.save().then(result => {
    console.log('favourites added ', result)
  }).catch(err => {
    console.log('came to favourite ', err);
  }).finally(() => {
    res.redirect('/fav-list')
  })
}


exports.getHomeDetails = (req, res, next) => {
  let id = req.params.id
  Home.findById(id).then((home) => {
    if (!home) {
      console.log("No home found");
      res.redirect('/home-list');
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
  console.log(id)
  Favourite.deleteFavById(id).then(result => {
    console.log('delete fav', result)
  }).catch(err => {
    console.log('not delete fav items ', err)
  }).finally(() => {
    res.redirect('/fav-list')
  })
}
const Favourite = require("../models/favModel");
const Home = require("../models/homeModel");

exports.getHomePost = (req, res, next) => {
  Home.find().then((homeDetails) => {
    res.render('store/home-list', { homeDetails, currentPage: 'home-list', title: 'Home List' });
  })
}

exports.getHome = (req, res, next) => {
  Home.find().then((homeDetails) => {
    res.render('store/index', { homeDetails: homeDetails, currentPage: 'home', title: 'Home airbnb' });
  })
}

exports.getFavList = (req, res, next) => {
  Favourite.find()
    .populate('homeId')
    .then(favourite => {
      // const favouriteHome = favourite.map(favId => favId.homeId)
      // console.log(favourite)
      res.render('store/fav-list', { homeDetails: favourite, currentPage: 'fav-list', title: 'My Favourite' });
    })
  // })
}

exports.getFavPost = (req, res, next) => {
  const homeId = req.body.homeId
  Favourite.findOne({ homeId: homeId }).then((exsitsFav) => {
    if (exsitsFav) {
      console.log('already exsite')
    }
    const fav = new Favourite({ homeId: homeId })
    fav.save().then(result => {
    }).then(() => {
      res.redirect('/fav-list')
      console.log('favourites added ')
    })
  }).catch(err => {
    console.log('came to favourite ', err);
  })


}


exports.deleteFav = (req, res, next) => {
  let id = req.params.id;
  console.log(id)
  Favourite.findOneAndDelete({ homeId: id }).then(result => {
    console.log('delete fav')
  }).catch(err => {
    console.log('not delete fav items ', err)
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


exports.getBooking = (req, res, next) => {
  res.render('store/booking', { currentPage: 'booking', title: 'My Booking Page' });
}

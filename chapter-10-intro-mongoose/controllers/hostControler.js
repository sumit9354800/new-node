const Home = require("../models/homeModel");

exports.getHome = (req, res, next) => {
  res.render('host/edit-home', { currentPage: 'addhome', title: 'Add Home', editing: false });
}

exports.getEditHome = (req, res, next) => {
  const id = req.params.id;
  const editing = req.query.editing === 'true';
  Home.findById(id).then((home) => {
    if (!home) {
      console.log("No home found");
      return res.redirect('/host/host-home');
    }
    res.render('host/edit-home', { home, currentPage: 'host-home-list', title: 'Edit Home', editing: editing });
  })
}

exports.getHostHome = (req, res, next) => {
  Home.find().then((homeDetails) => {
    res.render('host/host-home-list', { homeDetails, currentPage: 'host-home-list', title: 'Hosted Home' });
  })
}

exports.postHome = (req, res, next) => {
  const { image, housename, location, price, rating, description } = req.body
  const home = new Home({ image, houseName: housename, location, price, rating, description });
  home.save().then((result) => {
    console.log('home saved successfully ', result)
  });
  res.redirect('/');
}

exports.postEditHome = (req, res, next) => {
  const { image, housename, location, price, rating, description, id } = req.body
  Home.findById(id).then((home) => {
    home.image = image;
    home.houseName = housename;
    home.location = location;
    home.price = price;
    home.rating = rating;
    home.description = description
    home.save().then((result) => {
      console.log('home updated', result)
    }).catch(err => {
      console.log('error while updating ', err)
    })
    res.redirect('/host/host-home');
  }).catch(err => {
    console.log('error while finding home ', err)
  })
}

exports.postDeleteHome = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Home.findByIdAndDelete(id).then(() => {
    res.redirect('/host/host-home');
  }).catch((err) => {
    console.log("Error deleting home:", err);
  })
}

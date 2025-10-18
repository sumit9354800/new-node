const { Home } = require("../models/homeModel");

exports.getHome = (req, res, next) => {
  res.render('host/edit-home', { currentPage: 'addhome', title: 'Add Home', editing: false });
}

exports.getEditHome = (req, res, next) => {
  const id = req.params.id;
  const editing = req.query.editing === 'true';
  Home.findById(id).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      console.log("No home found");
      return res.redirect('/host/host-home');
    }
    console.log(id, editing, home);
    res.render('host/edit-home', { home, currentPage: 'host-home-list', title: 'Edit Home', editing: editing });
  })

}

exports.getHostHome = (req, res, next) => {
  Home.fetchAll().then(([homeDetails, feild]) => {
    res.render('host/host-home-list', { homeDetails, currentPage: 'host-home-list', title: 'Hosted Home' });
  })
}

exports.postHome = (req, res, next) => {
  const { image, housename, location, price, rating, description } = req.body
  const home = new Home(image, housename, location, price, rating, description);
  home.save();
  res.redirect('/');
}

exports.postEditHome = (req, res, next) => {
  const { image, housename, location, price, rating, description, id } = req.body
  const home = new Home(image, housename, location, price, rating, description, id);
  home.save();
  res.redirect('/host/host-home');
}

exports.postDeleteHome = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Home.deleteById(id).then(() => {
    res.redirect('/host/host-home');
  }).catch((err) => {
    console.log("Error deleting home:", err);
  })
}

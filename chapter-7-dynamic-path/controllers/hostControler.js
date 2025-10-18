const { Home } = require("../models/homeModel");

exports.getHome = (req, res, next) => {
  res.render('host/edit-home', { currentPage: 'addhome', title: 'Add Home', editing: false });
}
exports.getEditHome = (req, res, next) => {
  const id = req.params.id;
  const editing = req.query.editing === 'true';
  Home.findById(id, (home) => {
    if (!home) {
      console.log("No home found");
      return res.redirect('/host/host-home');
    }
    console.log(id, editing, home);
    res.render('host/edit-home', { home, currentPage: 'host-home-list', title: 'Edit Home', editing: editing });
  })

}

exports.getHostHome = (req, res, next) => {
  Home.fetchAll((homeDetails) => {
    res.render('host/host-home-list', { homeDetails, currentPage: 'host-home-list', title: 'Home List' });
  })
}

exports.postHome = (req, res, next) => {
  const { image, address, price, rating } = req.body
  const home = new Home(image, address, price, rating);
  home.save();
  res.redirect('/host/host-home');
}

exports.postEditHome = (req, res, next) => {
  const { id, image, address, price, rating } = req.body
  const home = new Home(image, address, price, rating);
  home.id = id;
  home.save();
  res.redirect('/host/host-home');
}

exports.postDeleteHome = (req, res, next) => {
  const id = req.params.id;
  Home.deleteById(id, (err) => {
    if (err) {
      console.log("Error deleting home:", err);
    }
    res.redirect('/host/host-home');
  })
}

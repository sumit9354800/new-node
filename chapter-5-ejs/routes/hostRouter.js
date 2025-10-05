// core modules
const path = require('path');
// external modules

const express = require('express');
const rootDir = require('../utils/pathUtils');
const hostRouter = express.Router();
hostRouter.use(express.static(path.join(rootDir, 'public')));

hostRouter.get("/add-home", (req, res) => {
  res.render('addhome', { pageTitle: 'Add Home Airbnb' });
  // res.sendFile(path.join(rootDir, 'views', 'addhome.html'))
})

const registerHome = []

hostRouter.post("/add-home", (req, res) => {
  res.render('homeadded', { pageTitle: 'Home Added Successfully' })
  registerHome.push(req.body);
  // res.sendFile(path.join(rootDir, 'views', 'homeadded.html'));

});


exports.hostRouter = hostRouter;
exports.registerHome = registerHome;
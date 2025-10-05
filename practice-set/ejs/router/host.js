const express = require('express');
const hostRouter = express.Router();

hostRouter.get('/add-home', (req, res, next) => {
  res.render('addHome', { currentPage: 'addhome' });
});

hostRouter.use(express.urlencoded());
const homeDetails = [];
hostRouter.post('/details-successfuly', (req, res, next) => {
  homeDetails.push(req.body);
  console.log(homeDetails);
  res.render('homeAdded', { currentPage: 'details' });
});

exports.hostRouter = hostRouter;
exports.homeDetails = homeDetails;
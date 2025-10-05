const path = require('path');
const express = require('express');
const { rootDir } = require('../utils/rootDir');
const { homeDetails } = require('./host');

const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
  res.render('home', { homeDetails, currentPage: 'home' });
});

exports.userRouter = userRouter;

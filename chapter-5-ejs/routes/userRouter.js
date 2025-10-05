// core modules
const path = require('path');
// externam modules
const express = require('express');

const userRouter = express.Router();
const rootDir = require('../utils/pathUtils');
const { registerHome } = require('./hostRouter');

userRouter.get("/", (req, res) => {
  console.log("home page", registerHome)
  res.render('home', { registerHome, pageTitle: 'airbnb - Home' });
})

module.exports = userRouter;
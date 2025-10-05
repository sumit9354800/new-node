const express = require('express');
const rootDir = require('../utils/rootDir');
const path = require('path');

const hostRouter = express.Router();

hostRouter.get('/contact-us', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'contact.html'));
})

hostRouter.use(express.urlencoded());

hostRouter.post('/details', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'details.html'))
  console.log(req.body)
});

module.exports = hostRouter;
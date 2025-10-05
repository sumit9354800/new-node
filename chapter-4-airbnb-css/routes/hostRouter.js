// core modules
const path = require('path');
// external modules

const express = require('express');
const rootDir = require('../utils/pathUtils');
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'addhome.html'))
})



hostRouter.post("/add-home", (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'homeadded.html'));

});


module.exports = hostRouter;
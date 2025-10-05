const express = require('express');
const { getHome, postHome } = require('../controllers/homes');
const hostRouter = express.Router();

hostRouter.get('/add-home', getHome);

hostRouter.use(express.urlencoded());

hostRouter.post('/details-successfuly', postHome);

exports.hostRouter = hostRouter;
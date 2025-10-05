const express = require('express');
const { getHome, postHome, getHostHome } = require('../controllers/hostControler');
const hostRouter = express.Router();

hostRouter.get('/add-home', getHome);
hostRouter.get('/host-home', getHostHome);

hostRouter.use(express.urlencoded());

hostRouter.post('/details-successfuly', postHome);

exports.hostRouter = hostRouter;
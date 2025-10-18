const express = require('express');
const { getHome, postHome, getHostHome, getEditHome, postEditHome, postDeleteHome } = require('../controllers/hostControler');
const hostRouter = express.Router();

hostRouter.get('/add-home', getHome);
hostRouter.get('/host-home', getHostHome);
hostRouter.get('/edit-home/:id', getEditHome);
hostRouter.post('/details-successfuly', postHome);
hostRouter.post('/edit-home', postEditHome);
hostRouter.post('/delete-home/:id', postDeleteHome);

exports.hostRouter = hostRouter;
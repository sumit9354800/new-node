const express = require('express');
const { getHomePost, getBooking, getFavList, getHomeDetails, getReserve, getHome, getFavPost } = require('../controllers/storeControler');

const storeRouter = express.Router();

storeRouter.get('/', getHome);
storeRouter.get('/home-list', getHomePost);
storeRouter.get('/booking', getBooking);
storeRouter.get('/fav-list', getFavList);
storeRouter.get('/fav-post', getFavPost);
storeRouter.get('/home-list/:id', getHomeDetails);
storeRouter.get('/reserve', getReserve);

exports.storeRouter = storeRouter;

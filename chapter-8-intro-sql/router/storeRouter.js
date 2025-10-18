const express = require('express');
const { getHomePost, getBooking, getFavList, getHomeDetails, getReserve, getHome, getFavPost, deleteFav } = require('../controllers/storeControler');

const storeRouter = express.Router();

storeRouter.get('/', getHome);
storeRouter.get('/home-list', getHomePost);
storeRouter.get('/booking', getBooking);
storeRouter.get('/fav-list', getFavList);
storeRouter.post('/fav-list', getFavPost);
storeRouter.get('/home-list/:id', getHomeDetails);
storeRouter.get('/reserve', getReserve);
storeRouter.get('/delete-fav/:id', deleteFav);

exports.storeRouter = storeRouter;
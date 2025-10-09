const express = require('express');
const { getHomePost } = require('../controllers/homes');

const userRouter = express.Router();

userRouter.get('/', getHomePost);

exports.userRouter = userRouter;

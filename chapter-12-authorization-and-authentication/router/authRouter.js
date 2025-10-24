const express = require('express');
const { getLogin, postLogin, postLogout } = require('../controllers/authControler');
const authRouter = express.Router();
authRouter.get('/login', getLogin);
authRouter.post('/login', postLogin);
authRouter.post('/logout', postLogout);

exports.authRouter = authRouter;
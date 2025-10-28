const express = require('express');
const { getLogin, postLogin, postLogout, getSignUp, postSignUp } = require('../controllers/authControler');
const authRouter = express.Router();
authRouter.get('/login', getLogin);
authRouter.post('/login', postLogin);
authRouter.post('/logout', postLogout);
authRouter.get('/sign-up', getSignUp)
authRouter.post('/sign-up', postSignUp)

exports.authRouter = authRouter;
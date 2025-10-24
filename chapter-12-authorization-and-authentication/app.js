const path = require('path');
const express = require('express');
const session = require('express-session')
const sessionMongoStore = require('connect-mongodb-session')(session)
const DB_PATH = 'mongodb+srv://imxsammy:imxsammy@imxsammy.crvkpax.mongodb.net/airbnb?retryWrites=true&w=majority&appName=imxsammy'

const { storeRouter } = require('./router/storeRouter');
const { hostRouter } = require('./router/hostRouter');
const { error404 } = require('./controllers/error404');
const { rootDir } = require('./utils/rootDir');
const { default: mongoose } = require('mongoose');
const { authRouter } = require('./router/authRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const store = new sessionMongoStore({
  uri: DB_PATH,
  collection: 'session'
})

app.use(express.static(path.join(rootDir, 'public')));

app.use(express.urlencoded());
app.use(session({
  secret: 'IMX SAMMY',
  resave: false,
  saveUninitialized: true,
  store: store
}))

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  // req.isLoggedIn = req.get('Cookie')?.split('=')[1] || false
  /*   OR  */
  // req.isLoggedIn = req.get('Cookie') ? req.get('Cookie').split('=')[1] === 'true' : 'false'
  next();
})
app.use(authRouter)
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (!req.isLoggedIn) {
    res.redirect('/login')
  } else {
    next();
  }
});
app.use("/host", hostRouter);
app.use(error404);

const port = 3008;


mongoose.connect(DB_PATH)
  .then(() => {
    console.log('Connected Mongoose')
    app.listen(process.env.port || port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    })
  })
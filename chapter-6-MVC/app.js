const express = require('express');
const path = require('path');
const { storeRouter } = require('./router/storeRouter');
const { hostRouter } = require('./router/hostRouter');
const { error404 } = require('./controllers/error404');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded());

app.use(storeRouter);
app.use(hostRouter);

app.use(error404);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
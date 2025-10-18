const path = require('path');
const express = require('express');
const { storeRouter } = require('./router/storeRouter');
const { hostRouter } = require('./router/hostRouter');
const { error404 } = require('./controllers/error404');
const { rootDir } = require('./utils/rootDir');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootDir, 'public')));

app.use(express.urlencoded());

app.use("/host", hostRouter);
app.use(storeRouter);
app.use(error404);

const port = 3006;

app.listen(process.env.port || port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
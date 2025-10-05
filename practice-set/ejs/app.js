const express = require('express');
const path = require('path');
const { rootDir } = require('./utils/rootDir');
const { userRouter } = require('./router/user');
const { hostRouter } = require('./router/host');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(rootDir, 'public')))

app.use(express.urlencoded());

app.use(userRouter);
app.use(hostRouter);

app.use((req, res, next) => {
  res.status(404).render('404', { currentPage: '404' });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
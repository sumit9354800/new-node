// core modules
const path = require('path')
// external modules
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
// lacal modules
const rootDir = require('./utils/pathUtils');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootDir, 'public')));
// app.use(bodyParser.urlencoded());
app.use(express.urlencoded());

app.use("/", userRouter)
app.use("/host", hostRouter)


app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
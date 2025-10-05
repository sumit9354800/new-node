const express = require('express');
const hostRouter = require('./routes/host');
const path = require('path');
const userHoster = require('./routes/user');
const rootDir = require('./utils/rootDir');

const app = express();

app.use((res, req, next) => {
  // console.log(req.url, req.method);
  next();
})

app.use(hostRouter)
app.use(userHoster)

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
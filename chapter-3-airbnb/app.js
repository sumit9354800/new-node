// core modules
const path = require('path')
// external modules
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');
// lacal modules
const rootDir = require('./utils/pathUtils');

const app = express();

// app.use(bodyParser.urlencoded());
app.use(express.urlencoded());

app.use((res, req, next) => {
  console.log("First Middleware");
  next();
})

app.use("/", userRouter)
app.use("/host", hostRouter)

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
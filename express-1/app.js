const express = require('express');

const app = express();

const requestHandler = require('./user');

app.use("/", (req, res, next) => {
  console.log("first middleware", req.url, req.method);
  res.send('<h1>Hello First Middleware</h1>');
  next();
})

app.use("/submit-details", (req, res, next) => {
  console.log("second middleware", req.url, req.method);
  res.send('<h1>Hello from Express</h1>');
})


const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
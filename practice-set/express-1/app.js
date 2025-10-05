const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log("First Middleware");
  next();
})

app.use((req, res, next) => {
  console.log("Second Middleware");
  next();
})



app.get('/contact-us', (req, res) => {
  console.log("GET Request");
  res.send(`
    <form action="/contact-us" method="POST">
      <input type="text" name="name" placeholder="Enter your name" />
      <button type="submit">Submit</button>
    </form>
  `);
})

app.post('/contact-us', (req, res) => {
  console.log("POST Request");
  res.send(`
    <h1>Hello !</h1> 
    <a href="/contact-us">Go Back</a>
    `);
})

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
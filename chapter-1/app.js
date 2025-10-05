const http = require("http")

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write(`
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <a href="/">Home</a>
  <a href="/men">Men</a>
  <a href="/women">Women</a>
  <a href="/kids">Kids</a>
  <a href="/card">card</a>
</body>
</html>
      `)

    res.end()
  }
  else if (req.url === "/men") {
    res.write(`
      <h1>Men</h1>
      `)
    res.end()
  }
  else if (req.url === "/women") {
    res.write(`
      <h1>Women</h1>
      `)
    res.end()
  }
  else if (req.url === "/kids") {
    res.write(`
      <h1>Kids</h1>
      `)
    res.end()
  }
  else if (req.url === "/card") {
    res.write(`
      <h1>Card</h1>
      `)
    res.end()
  }
  else {
    res.statusCode = 404
    res.write("<h1>404 Not Found</h1>")
    res.end()
  }
})


const PORT = 3000

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
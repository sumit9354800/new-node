const handler = (req, res) => {
  console.log(req.url, req.method);

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <h1>Welcome to the Home Page</h1>
      <a href="/calculator">calculator</a>
      `);

    return res.end();
  }
  else if (req.url.toLowerCase() === '/calculator') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
   <html lang="en">

<head>
  <title>Document</title>
</head>
<body>
  <form action="/calculate-result" method="post">
    <input type="text" placeholder="first" name="first" id="">
    <input type="text" placeholder="second" name="second" id="">
    <input type="submit" id="">
  </form>
</body>
</html>
      `);

    return res.end();
  }

  else if (req.url.toLowerCase() === '/calculate-result' && req.method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    })
    req.on('end', () => {
      const paramBody = Buffer.concat(body).toString();
      const paramsEntries = new URLSearchParams(paramBody);
      const { first, second } = Object.fromEntries(paramsEntries);
      let result = Number(first) + Number(second);
      console.log(result);
      res.setHeader('Content-Type', 'text/html');
      res.write(`<h1>Result is ${result}</h1>`);
      return res.end();
    });
  }

};

module.exports = handler;
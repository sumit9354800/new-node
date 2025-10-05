const fs = require("fs");

const userHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
   <form action="/submit-post" method="POST">
    <input type="text" name="username"><br><br>
    <input type="text" name="password">
    <input type="submit">
  </form>
</body>
</html>
    `);
    res.end();
  }
  else if (req.url.toLowerCase() === "/submit-post" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk)
      console.log("Received chunk:", chunk);
    });
    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const params = new URLSearchParams(fullBody)
      // const obj = {};
      // for (const [key, value] of params.entries()) {
      //   obj[key] = value;
      // }
      const paramsEntries = Object.fromEntries(params);
      console.log(paramsEntries)
      fs.writeFileSync("data.txt", JSON.stringify(paramsEntries));
    });


    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
  else {
    res.write(`<h1>404 - Not Found</h1>`);
    res.end();
  }
}

module.exports = userHandler;
const http = require("http");
const userHandler = require("./user");

const server = http.createServer(userHandler);
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
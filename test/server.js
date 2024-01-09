const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3050;
const hostname = "127.0.0.1";

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "public/index.html");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal Server Error");
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css");
    res.setHeader("Content-Type", "text/html");
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Online`);
});

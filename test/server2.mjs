import http from "http";
import fs from "fs";
import path from "path";
import url from "url";

const contentTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
};

const server = http.createServer((req, res) => {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
  let filePath = path.join(__dirname, req.url);

  if (filePath.endsWith("/")) {
    filePath = path.join(filePath, "static/index.html");
  }

  const extname = path.extname(filePath);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal Server Error: " + err.message); // Отправляем сообщение об ошибке
      return;
    }

    res.setHeader("Content-Type", contentTypes[extname] || "text/plain");
    res.statusCode = 200;
    res.end(data);
  });
});

server.listen(3000, "localhost", () => {
  console.log(`Server online`);
});

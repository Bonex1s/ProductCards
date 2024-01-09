import express from "express";
import path from "path";

const app = express();
const port = 3000;

// Указываем директорию, из которой будут обслуживаться статические файлы
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

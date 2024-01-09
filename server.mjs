import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const port = 3030;

// Парсер JSON для обработки данных POST-запросов
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Замените это на базу данных или массив для хранения товаров
let products = [];

app.use(express.static(join(__dirname, "static")));

// Обработка POST-запроса для добавления товара
app.post("/api/addProduct", (req, res) => {
  const productData = req.body;

  // Добавление товара в массив или базу данных
  products.push(productData);
  console.log(products);

  // Отправка ответа об успешном добавлении товара
  res
    .status(200)
    .json({ message: "Товар успешно добавлен", product: productData });
});

// Получение списка товаров (в реальном приложении это будет зависеть от вашего хранилища данных)
app.get("/api/getProducts", (req, res) => {
  res.status(200).json(products);
});

app.listen(port, () => {
  console.log(`Сервер Мяо на порту ${port}`);
});

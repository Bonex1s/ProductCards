// server.mjs
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pg from "pg";
import cors from "cors";
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
const { Pool } = pg;
const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydatabase",
  password: "58121",
  port: 5432,
});

app.use(express.static(join(__dirname, "static")));

app.post("/api/addProduct", async (req, res) => {
  try {
    const client = await pool.connect();

    const { name, model, price, color, text } = req.body;

    // Проверка, что price является числом
    if (isNaN(price)) {
      throw new Error("Invalid input for price");
    }

    const result = await client.query(
      "INSERT INTO mytable (name, model, price, color, text) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, model, price, color, text]
    );

    const addedProduct = result.rows[0];

    client.release();

    res
      .status(200)
      .json({ message: "Товар успешно добавлен", product: addedProduct });
  } catch (error) {
    console.error("Ошибка при добавлении товара:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

app.get("/api/getProducts", async (req, res) => {
  try {
    const client = await pool.connect();

    const result = await client.query("SELECT * FROM mytable");

    const products = result.rows;

    client.release();

    res.status(200).json(products);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

app.listen(port, () => {
  console.log(`Сервер Мяо на порту ${port}`);
});

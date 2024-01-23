import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";
import { PrismaClient } from "./prisma/generated/client/index.js";
import multer from "multer";
import { promises as fs } from "fs";
import { Buffer } from "buffer";

const upload = multer({ dest: "uploads/" });
const prisma = new PrismaClient();
const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, "static")));

app.post("/api/addProduct", upload.single("image"), async (req, res) => {
  try {
    const { name, model, price, color, text } = req.body;

    // Проверка, что price является числом
    if (isNaN(price)) {
      throw new Error("Invalid input for price");
    }
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const imageBuffer = await fs.readFile(req.file.path);
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");

    const addedProduct = await prisma.myTable.create({
      data: {
        name,
        model,
        price: parseInt(price),
        color,
        text,
        image: {
          create: {
            data: imageBase64,
            mimeType: req.file.mimetype,
          },
        },
      },
      include: {
        Image: true, // Указываем, что хотим включить информацию о связанной таблице image
      },
    });
    console.log("Product added:", addedProduct);

    await fs.unlink(req.file.path);

    res
      .status(200)
      .json({ message: "Товар успешно добавлен", product: addedProduct });
    console.log(createdItem);
  } catch (error) {
    console.error("Ошибка при добавлении товара:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

app.get("/api/getProducts", async (req, res) => {
  try {
    const products = await prisma.myTable.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

app.listen(port, () => {
  console.log(`Сервер Мяо на порту ${port}`);
});

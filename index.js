const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/products/create", async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      value: req.body.value,
      description: req.body.description,
      type: req.body.type,
      calories: req.body.calories,
    },
  });
  res.send(product);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

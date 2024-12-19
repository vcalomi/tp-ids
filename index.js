const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/products/create", async (req, res) => {
  res.send(
    await prisma.product.create({
      data: {
        name: "Medialuna",
        value: 2000,
        description: "Rica medialuna",
        type: ["Dulce", "Comida"],
        calories: 234,
      },
    })
  );
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

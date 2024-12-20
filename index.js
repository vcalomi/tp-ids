const productService = require("./service/productService.js");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

app.post("/products/create", async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.send(product);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

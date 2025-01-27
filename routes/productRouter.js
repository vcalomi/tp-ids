const express = require("express");
const router = express.Router();
const productService = require("../service/productService.js");

router.post("/create", async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    const location = `/products/${product.id}`;
    res.location(location).status(201).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const products = await productService.getProducts();
  res.status(200).send(products);
});

module.exports = router;

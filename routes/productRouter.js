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

router.get("/:productId", async (req, res) => {
  try {
    const product = await productService.getProduct(req.params.productId);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ message: error.message }).end();
  }
});

router.put("/edit/:productId", async (req, res) => {
  try {
    await productService.editProduct(req.params.productId, req.body);
    res.status(204).end();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/delete/:productId", async (req, res) => {
  try {
    await productService.deleteProduct(req.params.productId);
    res.status(204).end();
  } catch (error) {
    res.status(400).send({ message: error.message }).end();
  }
});

module.exports = router;

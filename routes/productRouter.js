const express = require("express");
const router = express.Router();
const productService = require("../service/productService.js");
const authMiddleware = require("../middleware/auth.js");

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      res.status(401).end();
    }
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

router.put("/edit/:productId", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      res.status(401).end();
    }
    await productService.editProduct(req.params.productId, req.body);
    res.status(204).end();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/delete/:productId", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      res.status(401).end();
    }
    await productService.deleteProduct(req.params.productId);
    res.status(204).end();
  } catch (error) {
    res.status(400).send({ message: error.message }).end();
  }
});

module.exports = router;

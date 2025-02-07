const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const productService = require("../service/productService.js");
const authMiddleware = require("../middleware/auth.js");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const user = req.user;
      if (user.role !== "ADMIN") {
        res.status(401).end();
      }

      const product = await productService.createProduct(req);
      const location = `/products/${product.id}`;
      res.location(location).status(201).send(product);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

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

router.put(
  "/edit/:productId",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const user = req.user;
      if (user.role !== "ADMIN") {
        return res.status(401).end();
      }

      await productService.editProduct(req);

      res.status(204).end();
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);

router.delete("/delete/:productId", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      return res.status(401).end();
    }

    const productId = req.params.productId;
    const product = await productService.getProduct(productId);

    if (product.image) {
      const imagePath = path.join(__dirname, "..", "uploads", product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await productService.deleteProduct(productId);

    res.status(204).end();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;

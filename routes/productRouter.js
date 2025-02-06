const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productService = require("../service/productService.js");
const authMiddleware = require("../middleware/auth.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

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
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      const productData = { ...req.body, imageUrl };
      const product = await productService.createProduct(productData);
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

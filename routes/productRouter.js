const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const productService = require("../service/productService.js");
const authMiddleware = require("../middleware/auth.js");
const s3 = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const storage = multer.memoryStorage();

const upload = multer({ storage });

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3Client = new s3.S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

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

      const params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      const command = new s3.PutObjectCommand(params);

      await s3Client.send(command);

      const imageName = req.file.originalname;
      const productData = { ...req.body, imageName };
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

  for (const product of products) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: product.image,
    };

    const command = new s3.GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3Client, command);
    product.image = url;
  }

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

      const productId = req.params.productId;
      const productData = req.body;

      if (req.file) {
        productData.image = `/uploads/${req.file.filename}`;
      }

      await productService.editProduct(productId, productData);

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

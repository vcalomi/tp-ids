const ProductRepository = require("../repository/productRepository.js");
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

function validateProductData(data) {
  const { name, description, value, type, calories } = data;

  if (!name || name.trim().length === 0) {
    throw new Error("Product name is required and cannot be empty");
  }

  if (!description || description.trim().length === 0) {
    throw new Error("Product description is required and cannot be empty");
  }

  if (value == null || value < 0) {
    throw new Error("Product value must be a positive number");
  }

  if (!type || type.length === 0) {
    throw new Error("Product type is required and cannot be empty");
  }

  if (calories == null || calories < 0) {
    throw new Error("Product calories must be a positive number");
  }
}

async function createProduct(request) {
  validateProductData(request.body);

  const params = {
    Bucket: bucketName,
    Key: request.file.originalname,
    Body: request.file.buffer,
    ContentType: request.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3Client.send(command);

  const imageName = request.file.originalname;
  const productData = { ...request.body, imageName };

  return ProductRepository.createProduct(productData);
}

async function getProduct(id) {
  return ProductRepository.getProduct(id);
}

async function getProducts() {
  const products = await ProductRepository.getProducts();

  for (const product of products) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: product.image,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3Client, command);
    product.image = url;
  }
  return products;
}

async function deleteProduct(productId) {
  await ProductRepository.deleteProduct(productId);
}

async function editProduct(productId, productData) {
  validateProductData(productData);
  await ProductRepository.editProduct(productId, productData);
}

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  editProduct,
};

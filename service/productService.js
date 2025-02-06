const ProductRepository = require("../repository/productRepository.js");

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

async function createProduct(productData) {
  validateProductData(productData);
  return ProductRepository.createProduct(productData);
}

async function getProduct(id) {
  return ProductRepository.getProduct(id);
}

async function getProducts() {
  return await ProductRepository.getProducts();
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

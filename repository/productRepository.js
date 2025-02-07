const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ProductRepository = {
  async createProduct(productData) {
    const product = await prisma.product.create({
      data: {
        name: productData.name,
        value: parseFloat(productData.value),
        description: productData.description,
        type: Array.isArray(productData.type)
          ? productData.type
          : [productData.type],
        calories: parseInt(productData.calories),
        image: productData.imageName,
      },
    });
    return product;
  },
  async getProduct(productId) {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });
    return product;
  },
  async getProducts() {
    const products = await prisma.product.findMany();
    return products;
  },
  async deleteProduct(productId) {
    await prisma.product.delete({
      where: {
        id: parseInt(productId),
      },
    });
  },
  async editProduct(productId, productData) {
    await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        name: productData.name,
        value: parseFloat(productData.value),
        description: productData.description,
        type: Array.isArray(productData.type)
          ? productData.type
          : [productData.type],
        calories: parseInt(productData.calories),
        image: productData.image,
      },
    });
  },
};

module.exports = ProductRepository;

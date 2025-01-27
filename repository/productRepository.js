const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ProductRepository = {
  async createProduct(productData) {
    const product = await prisma.product.create({
      data: {
        name: productData.name,
        value: productData.value,
        description: productData.description,
        type: productData.type,
        calories: productData.calories,
      },
    });
    return product;
  },
  async getProduct(productId) {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId)
      },
    })
    return product;
  }
}

module.exports = ProductRepository;

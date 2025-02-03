const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const orderRepository = {
  async createOrder(orderData) {
    const order = await prisma.order.create({
      data: {
        totalPrice: orderData.totalPrice,
        user: {
          connect: { id: orderData.userId },
        },
        orderStatus: orderData.orderStatus,
        products: {
          create: orderData.products.map((product) => ({
            product: {
              connect: { id: product.productId },
            },
            quantity: product.quantity,
          })),
        },
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    const formattedOrder = {
      ...order,
      products: order.products.map((orderProduct) => ({
        productId: orderProduct.product.id,
        name: orderProduct.product.name,
        quantity: orderProduct.quantity,
        value: orderProduct.product.value,
      })),
    };

    return formattedOrder;
  },
  async getOrders() {
    const orders = await prisma.order.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
        address: true,
      },
    });
    return orders;
  },
};

module.exports = orderRepository;

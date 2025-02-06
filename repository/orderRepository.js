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
        user: {
          include: {
            address: true,
          },
        },
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    return orders;
  },
  async setOrderStatus(orderId, orderStatus) {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus: orderStatus,
      },
    });
  },
  async deleteOrder(orderId) {
    await prisma.orderProduct.deleteMany({
      where: {
        orderId: parseInt(orderId),
      },
    });

    await prisma.order.delete({
      where: {
        id: parseInt(orderId),
      },
    });
  },
};

module.exports = orderRepository;

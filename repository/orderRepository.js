const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const orderRepository = {
  async createOrder(orderData) {
    const order = await prisma.order.create({
      data: {
        totalPrice: orderData.totalPrice,
        address: orderData.address,
        addressId: orderData.addressId,
        products: orderData.productse,
        ownerName: orderData.ownerName,
        orderStatus: orderData.orderStatus
      },
    });
    return order;
  },
};

module.exports = orderRepository;

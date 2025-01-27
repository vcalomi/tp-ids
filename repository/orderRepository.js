const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const orderRepository = {
  async createOrder(orderData) {
    const order = await prisma.order.create({
      data: {
        totalPrice: orderData.totalPrice,
        address: {
          connect: { id: orderData.addressId }
        },
        ownerName: orderData.ownerName,
        orderStatus: orderData.orderStatus,
        products: {
          create: orderData.products.map(product => ({
            product: {
              connect: { id: product.productId }
            },
            quantity: product.quantity
          }))
        }
      },
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });
    const formattedOrder = {
      ...order,
      products: order.products.map(orderProduct => ({
        productId: orderProduct.product.id,
        name: orderProduct.product.name,
        quantity: orderProduct.quantity,
        value: orderProduct.product.value
      }))
    };

    return formattedOrder;
  },
};

module.exports = orderRepository;

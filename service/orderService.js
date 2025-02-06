const orderRepository = require("../repository/orderRepository.js");
const productService = require("./productService.js");
const authService = require("./authService.js");

async function calculatePrice(products) {
  let totalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    const product = await productService.getProduct(products[i].productId);
    totalPrice += product.value * products[i].quantity;
  }
  return totalPrice;
}

async function createOrder(orderData) {
  const products = orderData.products;
  const totalPrice = await calculatePrice(products);
  const user = await authService.findUserById(orderData.userId);
  if (!user) {
    throw new Error("User doesn't exist");
  }
  return orderRepository.createOrder({
    totalPrice: totalPrice,
    products: products,
    userId: orderData.userId,
    orderStatus: "PENDIENTE",
  });
}

async function getOrders() {
  return orderRepository.getOrders();
}

async function getUserOrders(userId) {
  const user = await authService.findUserById(userId);
  return { orders: user.orders, address: user.address };
}

async function setOrderStatus(orderId, orderStatus) {
  await orderRepository.setOrderStatus(parseInt(orderId), orderStatus);
}

async function deleteOrder(orderId) {
  await orderRepository.deleteOrder(orderId);
}

async function cancelOrder(orderId, userId) {
  const userInfo = await getUserOrders(userId);
  const order = userInfo.orders.find((order) => order.id === parseInt(orderId));

  if (!order) {
    throw new Error("La orden no existe o no pertenece al usuario.");
  }

  await orderRepository.deleteOrder(orderId);
}

module.exports = {
  createOrder,
  getOrders,
  getUserOrders,
  setOrderStatus,
  deleteOrder,
  cancelOrder,
};

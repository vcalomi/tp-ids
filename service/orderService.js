const orderRepository = require("../repository/orderRepository.js");
const addressService = require("./addressService.js");
const productService = require("./productService.js")

async function calculatePrice(products) {
  let totalPrice = 0
  for (let i = 0; i < products.length; i++) {
    const product = await productService.getProduct(products[i].productId)
    totalPrice += product.value
  }
  return totalPrice;
}

async function createOrder(orderData) {
  const address = await addressService.getAddress(orderData.addressId)
  const products = orderData.products
  const totalPrice = await calculatePrice(products)
  return orderRepository.createOrder({totalPrice: totalPrice, address: address, addressId: orderData.addressId, products: products, ownerName: orderData.ownerName, orderStatus: "PENDIENTE"});
}

async function getOrders() {
  return orderRepository.getOrders()
}

module.exports = {
  createOrder,
  getOrders
};

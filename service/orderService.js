const orderRepository = require("../repository/orderRepository.js");
const addressService = require("./addressService.js");



async function createOrder(orderData) {
  const address = addressService.getAddress(orderData.addressId)
  return orderRepository.createOrder({totalPrice: orderData.totalPrice, address: address, addressId: orderData.addressId, products: orderData.products, ownerName: orderData.ownerName, orderStatus: "PENDIENTE"});
}

module.exports = {
  createOrder,
};

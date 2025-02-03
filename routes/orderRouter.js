const express = require("express");
const router = express.Router();
const orderService = require("../service/orderService.js");
const authMiddleware = require("../middleware/auth.js");

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const orderData = { ...req.body, userId };
    const order = await orderService.createOrder(orderData);
    const location = `/orders/${order.id}`;
    res.location(location).status(201).send(order);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;

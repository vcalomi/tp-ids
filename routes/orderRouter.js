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

router.get("/all", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      res.status(401).end();
    }
    const orders = await orderService.getOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put("/changeStatus/:orderId", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      res.status(401).end();
    }

    await orderService.setOrderStatus(req.params.orderId, req.body.orderStatus);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderService.getUserOrders(userId);
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;

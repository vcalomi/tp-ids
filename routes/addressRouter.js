const express = require("express");
const router = express.Router();
const addressService = require("../service/addressService.js");
const authMiddleware = require("../middleware/auth.js");

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const addressData = { ...req.body, userId };
    const address = await addressService.addAddress(addressData);
    const location = `/address/${address.id}`;
    res.location(location).status(201).send(address);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/get", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const address = await addressService.getAddress(userId);
    if (!address) {
      res.status(404).end();
      return;
    }
    res.status(200).send(address);
  } catch (error) {
    console.error(error);
    res.status(401).send(error.message);
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    if (req.params.id) {
      const addressId = req.params.id;
      const userId = req.user.id;
      const deletedAddress = await addressService.deleteAddress(
        addressId,
        userId
      );
      res.status(200).send({
        message: `La direccion ${deletedAddress.street} ${deletedAddress.number} fue borrada correctamente.`,
      });
    } else {
      res.status(400).send({ error: "Falta ID" });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.put("/update", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const address = await addressService.updateAddress(req.body, userId);
    res.status(200).send(address);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;

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

router.get("/get/:id", async (req, res) => {
  if (req.params.id) {
    const id = req.params.id;
    const address = await addressService.getAddress(id);
    res.status(200).send(address);
  } else {
    res.status(400).send({ error: "Falta ID" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    if (req.params.id) {
      const id = req.params.id;
      const deletedAddress = await addressService.deleteAddress(id);
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

router.put("/update", async (req, res) => {
  try {
    const address = await addressService.updateAddress(req.body);
    res.status(200).send(address);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;

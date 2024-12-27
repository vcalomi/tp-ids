const express = require("express");
const router = express.Router();
const addressService = require("../service/addressService.js");

router.post("/add", async (req, res) => {
  try {
    const address = await addressService.addAddress(req.body);
    const location = `/addresss/${address.id}`;
    res.location(location).status(201).send(address);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;

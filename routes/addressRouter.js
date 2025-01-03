const express = require("express");
const router = express.Router();
const addressService = require("../service/addressService.js");

router.post("/add", async (req, res) => {
  try {
    const address = await addressService.addAddress(req.body);
    const location = `/address/${address.id}`;
    res.location(location).status(201).send(address);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/get/:id", async (req, res) => {
  if (req.params.id) {
    const id = req.params.id
    const address = await addressService.getAddress(id)
    res.status(200).send(address)
  } else {
    res.status(400).send({ error: "Falta ID" })
  }
})

module.exports = router;

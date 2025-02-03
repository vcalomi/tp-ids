const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authService = require("../service/authService.js");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await authService.findUser(username);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await authService.createUser(username, hashedPassword);

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };

    jwt.sign(payload, "jwt_secret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


module.exports = router;

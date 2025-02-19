const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authService = require("../service/authService.js");
const authMiddleware = require("../middleware/auth.js");

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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authService.findUser(username);

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

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
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.get("/users", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      res.status(401).end();
    }
    const users = await authService.getUsers();
    res.status(200).send(users).end();
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

module.exports = router;

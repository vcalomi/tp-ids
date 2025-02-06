const express = require("express");
const productRouter = require("./routes/productRouter.js");
const addressRouter = require("./routes/addressRouter.js");
const orderRouter = require("./routes/orderRouter.js");
const authRouter = require("./routes/authRouter.js");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

app.use("/auth", authRouter);

app.use("/products", productRouter);

app.use("/address", addressRouter);

app.use("/orders", orderRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

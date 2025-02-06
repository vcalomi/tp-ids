const express = require("express");
const productRouter = require("./routes/productRouter.js");
const addressRouter = require("./routes/addressRouter.js");
const orderRouter = require("./routes/orderRouter.js");
const authRouter = require("./routes/authRouter.js");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.port || 3000;
app.use(express.json());

app.use(
  cors({
    origin: "https://sweet-tooth-xtxl.onrender.com",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.get("/products", (req, res) => {
  res.json([{ id: 1, name: "Producto de prueba" }]);
});

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});

app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

app.use("/auth", authRouter);

app.use("/products", productRouter);

app.use("/address", addressRouter);

app.use("/orders", orderRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

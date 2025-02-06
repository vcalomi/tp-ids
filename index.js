const express = require("express");
const productRouter = require("./routes/productRouter.js");
const addressRouter = require("./routes/addressRouter.js");
const orderRouter = require("./routes/orderRouter.js");
const authRouter = require("./routes/authRouter.js");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;
app.use(express.json());

const corsOptions = {
  origin: "https://tp-ids-2c0u.onrender.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

app.use("/auth", authRouter);

app.use("/products", productRouter);

app.use("/address", addressRouter);

app.use("/orders", orderRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

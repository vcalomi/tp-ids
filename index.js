const express = require("express");
const productRouter = require("./routes/productRouter.js");
const addressRouter = require("./routes/addressRouter.js");
const orderRouter = require("./routes/orderRouter.js");
const authRouter = require("./routes/authRouter.js");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/auth", authRouter);

app.use("/products", productRouter);

app.use("/address", addressRouter);

app.use("/orders", orderRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

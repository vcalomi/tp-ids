const express = require("express");
const productRouter = require("./routes/productRouter.js");
const addressRouter = require("./routes/addressRouter.js");
const app = express();
const port = 3000;
app.use(express.json());

app.use("/products", productRouter);

app.use("/address", addressRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

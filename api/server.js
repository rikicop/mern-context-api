const express = require("express");
const products = require("./data/products");
const app = express();
const dotenv = require("dotenv");

app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((pr) => pr._id === req.params.id);
  res.send(product);
});

//define PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Listening port ${PORT}`));

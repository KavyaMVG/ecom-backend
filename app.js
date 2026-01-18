const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const database = require("./database");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const cors = require("cors");
const userController = require("./controllers/user");
const productController = require("./controllers/product");
const orderController = require("./controllers/order");
const { auth } = require("./middlewares/auth");

app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

app.post("/user/register", userController.userRegister);
app.post("/user/login", userController.userLogin);

app.get("/products", auth, productController.getAllProducts); // for user

app.get("/admin/:id/products", auth, productController.getAdminProducts);
app.post("/admin/products", productController.addProduct);
app.put("/admin/:id/products", auth, productController.updateProduct);
app.delete("/admin/:id/products", auth, productController.deleteProduct);

app.post("/user/order", auth, orderController.createOrder);
app.get("/user/orders", auth, orderController.getOrders);

app.listen(PORT, () => {
  console.log(`listening at port:${PORT}`);
  database.connect();
});

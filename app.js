import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import * as userController from "./controllers/user.js";
import * as productController from "./controllers/product.js";
import * as orderController from "./controllers/order.js";
import { auth } from "./middlewares/auth.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/user/register", userController.userRegister);
app.post("/user/login", userController.userLogin);
app.post("/admin/login", userController.adminLogin);

app.get("/products", auth, productController.getAllProducts); // for user
app.get("/product/:id", auth, productController.getProductById);

app.get("/admin/:id/products", auth, productController.getAdminProducts);
app.post("/admin/products", productController.addProduct);
app.put("/admin/products/:id", auth, productController.updateProduct);
app.delete("/admin/products/:id", auth, productController.deleteProduct);

app.post("/user/order", auth, orderController.createOrder);
app.get("/user/orders", auth, orderController.getOrders);

app.listen(process.env.PORT, async () => {
  await connect();

  console.log(`listening at port:${process.env.PORT}`);
});

export default app;

const express = require("express");
const router = express.Router();
const appMiddleware = require("../middlewares/appMiddleware");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");

router.post("/users", appMiddleware.validateAppType, userController.createUser);
router.post("/products", productController.createProduct);
router.post(
  "/orders",
  appMiddleware.validateAppType,
  orderController.createOrder
);

module.exports = router;

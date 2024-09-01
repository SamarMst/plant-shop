const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrderStatus,
  getPlantsHistory,
} = require("../controller/orders");

router.post("/", createOrder);

router.put("/status", updateOrderStatus);

module.exports = router;

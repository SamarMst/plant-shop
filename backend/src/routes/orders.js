const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrderStatus,
  getSoldPlantsHistory,
  getBoughtPlantsHistory,
} = require("../controller/orders");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticate");

router.post("/", authenticateToken, createOrder);

router.put("/status", authenticateToken, updateOrderStatus);

router.get("/history/sold", authenticateToken, getSoldPlantsHistory);

router.get("/history/bought", authenticateToken, getBoughtPlantsHistory);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrderStatus,
  getSoldPlantsHistory,
  getBoughtPlantsHistory,
} = require("../controller/orders");


router.post("/", createOrder);

router.put("/status", updateOrderStatus);

router.get("/history/sold", getSoldPlantsHistory);

router.get("/history/bought", getBoughtPlantsHistory);

module.exports = router;

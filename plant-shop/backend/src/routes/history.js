const express = require("express");
const router = express.Router();
const { getHistory } = require("../controller/history");
const { getPendingOrders } = require("../controller/history");

router.get("/pendings", getPendingOrders);
router.get("/", getHistory);

module.exports = router;

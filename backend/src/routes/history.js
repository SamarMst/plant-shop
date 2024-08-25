const express = require("express");
const router = express.Router();
const { getPlantsHistory } = require("../controller/history");

router.get("/", getPlantsHistory);

module.exports = router;

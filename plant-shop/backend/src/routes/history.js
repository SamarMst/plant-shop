const express = require("express");
const router = express.Router();
const { getHistory } = require("../controller/history");

router.get("/", getHistory);

module.exports = router;

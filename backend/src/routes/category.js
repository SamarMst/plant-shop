const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategory,
  updateCategory,
} = require("../controller/category");
const authenticateToken = require("../middleware/authenticate");

router.post("/", authenticateToken, createCategory);

router.get("/history/sold", authenticateToken, getCategory);

router.put("/:id", updateCategory);

module.exports = router;

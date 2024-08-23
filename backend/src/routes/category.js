const express = require("express");
const router = express.Router();
const {
    createCategory,
    getCategory,
} = require("../controller/category");
const authenticateToken = require("../middleware/authenticate");

router.post("/", authenticateToken, createCategory);


router.get("/history/sold", authenticateToken, getCategory);


module.exports = router;

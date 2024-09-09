const router = require("express").Router();
const validateUserInfo = require("../Validation/userInfo");

const { setUserInfo, getUserInfo } = require("../controller/user");
const authenticateToken = require("../middleware/authenticate");

router.post("/:userId/info", authenticateToken, validateUserInfo, setUserInfo);

router.get("/:userId/info", authenticateToken, getUserInfo);

module.exports = router;

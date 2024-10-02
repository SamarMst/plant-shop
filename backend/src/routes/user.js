const router = require("express").Router();
const validateUserInfo = require("../Validation/userInfo");

const { setUserInfo, getUserInfo,getUserInformation,setUserInformation } = require("../controller/user");
const authenticateToken = require("../middleware/authenticate");

router.get("/my-info", authenticateToken, getUserInformation);
router.post("/my-info", authenticateToken, setUserInformation);

router.post("/:userId/info", authenticateToken, validateUserInfo, setUserInfo);

router.get("/:userId/info", authenticateToken, getUserInfo);

module.exports = router;

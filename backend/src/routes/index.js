const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");

const planteRouter = require("./plante");
const authRouter = require("./auth");
const orderRoutes = require("./orders");
const categoryRouter = require("./category");
const historyRouter = require("./history");
const userInfoRouter = require("./user");

router.use("/auth", authRouter);
router.use("/plante", planteRouter);
router.use("/orders", authenticateToken, orderRoutes);
router.use("/category", categoryRouter);
router.use("/history", authenticateToken, historyRouter);
router.use("/user", authenticateToken, userInfoRouter);

module.exports = router;

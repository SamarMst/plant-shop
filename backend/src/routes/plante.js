const router = require("express").Router();

const multer = require("multer");
const { imageMulterConfig } = require("../config/multer");

const {
  createPlant,
  getAllPlants,
  getPlantById,
  getMyOwnPlants,
  updatePlantById,
  deletePlantById,
  getPlantsInStock,
  getPlantsOutOfStock,
  restockPlantById,
} = require("../controller/plante");

const authenticateToken = require("../middleware/authenticate");
const validatePlant = require("../Validation/plant");
router.post(
  "/",
  authenticateToken,
  multer(imageMulterConfig).single("file"),
  validatePlant,
  createPlant
);

router.get("/", getAllPlants);

router.get("/mine", authenticateToken, getMyOwnPlants);

router.get("/stock", authenticateToken, getPlantsInStock);

router.get("/notinstock", authenticateToken, getPlantsOutOfStock);

router.get("/:id", getPlantById);

router.put("/:id", authenticateToken, updatePlantById);

router.delete("/:id", authenticateToken, deletePlantById);

router.put(
  "/restock/:id/quantity/:quantity",
  authenticateToken,
  restockPlantById
);

module.exports = router;

const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

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

router.post("/", authenticateToken, createPlant);

router.get("/", getAllPlants);

router.get("/mine", authenticateToken, getMyOwnPlants);

router.get("/stock", authenticateToken, getPlantsInStock);

router.get("/notinstock", getPlantsOutOfStock);

router.get("/:id", getPlantById);

router.put("/:id", updatePlantById);

router.delete("/:id", deletePlantById);

router.put("/restock/:id/quantity/:quantity", restockPlantById);

module.exports = router;

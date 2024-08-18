const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
  createPlant,
  getPlants,
  getPlantById,
  updatePlant,
  deletePlant,
  getStock,
  getPlantsNotInStock,
  restockPlantById,
} = require("../controller/plante");

//refactor the code to use the controller functions

router.post("/", createPlant);

router.get("/", getPlants);

router.get("/:id", getPlantById);

router.put("/:id", updatePlant);

router.delete("/:id", deletePlant);

router.get("/stock", getStock);

router.get("/notinstock", getPlantsNotInStock);

router.put("/restock/:id", restockPlantById);

module.exports = router;

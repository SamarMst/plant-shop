const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPlant = async (req, res) => {
  const { name, type, price, quantity, stock, plantCategoryId } = req.body;
  const userId = req.user.id;
  try {
    if (!name || price <= 0) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields correctly." });
    }

    const existingPlant = await prisma.plant.findFirst({ where: { name } });
    console.log(name);
    if (existingPlant) {
      return res.status(409).json({ message: "Plant already exists." });
    }

    const newStockStatus = quantity > 0;
    const newPlant = await prisma.plant.create({
      data: {
        name,
        type,
        price,
        quantity,
        stock: newStockStatus,
        plantCategoryId,
        userId,
      },
    });

    res.status(201).json(newPlant);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllPlants = async (req, res) => {
  try {
    const plants = await prisma.plant.findMany({
      include: {
        User: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json(plants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while retrieving plants." });
  }
};

const getMyOwnPlants = async (req, res) => {
  try {
    const userId = req.user.id;
    const plant = await prisma.plant.findMany({
      where: { userId },
    });
    res.status(200).json(plant);
  } catch (error) {}
};

const getPlantById = async (req, res) => {
  const plantId = req.params.id;
  try {
    const plant = await findPlantById(plantId);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found." });
    }
    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const updatePlantById = async (req, res) => {
  const plantId = req.params.id;
  const { name, type, price, quantity, stock } = req.body;

  try {
    const plant = await findPlantById(plantId);

    if (!plant) {
      return res.status(404).json({ message: "Plant not found." });
    }

    const updatedPlant = await prisma.plant.update({
      where: { id: parseInt(plantId) },
      data: { name, type, price, quantity, stock },
    });

    res.status(200).json(updatedPlant);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const deletePlantById = async (req, res) => {
  const plantId = req.params.id;

  try {
    const plant = await findPlantById(plantId);

    if (!plant) {
      return res.status(404).json({ message: "Plant not found." });
    }

    await prisma.plant.delete({ where: { id: parseInt(plantId) } });

    res.status(200).json({ message: "Plant deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getPlantsInStock = async (req, res) => {
  try {
    const plantsInStock = await findPlantsByStockStatus(true);
    res.status(200).json(plantsInStock);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getPlantsOutOfStock = async (req, res) => {
  try {
    const plantsOutOfStock = await findPlantsByStockStatus(false);
    console.log(plantsOutOfStock);
    res.status(200).json(plantsOutOfStock);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving plants not in stock.",
    });
  }
};

const restockPlantById = async (req, res) => {
  const plantId = req.params.id;
  const quantity = req.params.quantity;

  try {
    const plant = await findPlantById(plantId);

    if (!plant) {
      return res.status(404).json({ message: "Plant not found." });
    }

    const updatedQuantity = plant.quantity + parseInt(quantity);
    const updatedPlant = await prisma.plant.update({
      where: { id: parseInt(plantId) },
      data: { quantity: updatedQuantity, stock: updatedQuantity > 0 },
    });

    res
      .status(200)
      .json({ message: "Plant restocked successfully.", plant: updatedPlant });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const findPlantsByStockStatus = async (stockStatus) => {
  return await prisma.plant.findMany({ where: { stock: stockStatus } });
};

const findPlantById = async (plantId) => {
  return await prisma.plant.findFirst({
    where: { id: parseInt(plantId) },
    include: { plantCategory: true },
  });
};

module.exports = {
  createPlant,
  getAllPlants,
  getPlantById,
  getMyOwnPlants,
  updatePlantById,
  deletePlantById,
  getPlantsInStock,
  getPlantsOutOfStock,
  restockPlantById,
};

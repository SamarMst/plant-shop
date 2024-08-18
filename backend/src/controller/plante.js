const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPlant = async (req, res) => {
  let { name, type, price, quantity, stock } = req.body;
  try {
    if (name === "" || price <= 0) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields correctly." });
    }

    const plantExist = await prisma.plant.findFirst({
      where: {
        name,
      },
    });

    if (plantExist) {
      return res.status(409).json({ message: "Plant already exists." });
    }

    if (quantity > 0) {
      stock = true;
    }
    const plant = await prisma.plant.create({
      data: {
        name,
        type,
        price,
        quantity,
        stock,
      },
    });

    res.status(201).json(plant);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getPlants = async (req, res) => {
  try {
    const plante = await prisma.plant.findMany();
    res.status(200).json(plante);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while retrieving plants." });
  }
};

const getPlantById = async (req, res) => {
  const planteId = req.params.id;
  try {
    const plante = findPlant(planteId);

    if (plante === null) {
      res.status(404).json({ message: "plante not found" });
    }
    res.status(200).json(plante);
  } catch (error) {
    console.log("🚀 ~ router.get ~ error:", error);
  }
};

const updatePlant = async (req, res) => {
  const planteId = req.params.id;
  const { name, type, price, quantity, stock } = req.body;

  try {
    const plante = findPlant(planteId);

    if (plante === null) {
      res.status(404).json({ message: "plante not found" });
    }

    const updatedPlant = await prisma.plant.update({
      where: { id: parseInt(planteId) },
      data: { name, type, price, quantity, stock },
    });

    res.status(200).json(updatedPlant);
  } catch (error) {
    console.log("🚀 ~ router.put ~ error:", error);
  }
};

const deletePlant = async (req, res) => {
  const planteId = req.params.id;

  try {
    const plante = findPlant(planteId);

    if (plante == null) {
      return res.status(404).json({ message: "Plant not found." });
    }

    await prisma.plant.delete({
      where: { id: parseInt(planteId) },
    });

    res.status(200).json({ message: "Plant deleted successfully." });
  } catch (error) {
    console.log("🚀 ~ router.delete ~ error:", error);
  }
};

const getStock = async (req, res) => {
  try {
    inStock(true);
  } catch (error) {
    console.log("🚀 ~ router.get(/stock) ~ error:", error);
  }
};

const getPlantsNotInStock = async (req, res) => {
  try {
    inStock(false);
  } catch (error) {
    console.log("🚀 ~ router.get(/notinstock) ~ error:", error);
    res.status(500).json({
      message: "An error occurred while retrieving plants not in stock.",
    });
  }
};

const restockPlantById = async (req, res) => {
  const planteId = req.params.id;
  const { quantity } = req.body;

  try {
    const plante = findPlant(planteId);

    console.log(plante);
    console.log(typeof planteId);

    // const plante = await findPlantById(planteId);

    // console.log()=result , console.log(typeof planteId)

    if (plante === null) {
      return res.status(404).json({ message: "Plant not found." });
    }

    const newquantity = plante.quantity + quantity;
    const updatedPlant = await prisma.plant.update({
      where: { id: parseInt(planteId) },
      data: { quantity: newquantity, stock: newquantity > 0 },
    });

    res
      .status(200)
      .json({ message: "Plant restocked successfully.", plant: updatedPlant });
  } catch (error) {
    console.log("🚀 ~ router.put(/restock/:id) ~ error:", error);
  }
};

const findPlantById = async (planteId) => {
  try {
    const plant = findPlant(planteId);
    return plant || null;
  } catch (error) {
    console.log("🚀 ~ findPlantById ~ error:", error);
  }
};

const inStock = async (inStock) => {
  const planteNotInStock = await prisma.plant.findMany({
    where: {
      stock: inStock,
    },
  });
  res.status(200).json(planteNotInStock);
};

const findPlant = (planteId) => {
  prisma.plant.findFirst({
    where: {
      id: parseInt(planteId),
    },
  });
  return planteId;
};

module.exports = {
  createPlant,
  getPlants,
  getPlantById,
  updatePlant,
  deletePlant,
  getStock,
  getPlantsNotInStock,
  restockPlantById,
};

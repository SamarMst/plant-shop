const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const yup = require("yup");

const createPlant = async (req, res) => {
  const { name, type, price, quantity, categoryIds } = req.body;
  const categoryIdsArray =
    typeof categoryIds === "string" ? categoryIds.split(",") : categoryIds;

  const userId = req.user.id;
  const files = req.files || [];
  const userRole = req.user.role;

  try {
    if (userRole !== "SELLER") {
      return res
        .status(403)
        .json({ message: "Only sellers can create plants." });
    }

    const existingPlant = await prisma.plant.findFirst({ where: { name } });
    if (existingPlant) {
      return res.status(409).json({ message: "Plant already exists." });
    }

    const categoryChecks = categoryIdsArray.map((id) =>
      prisma.plantCategory.findFirst({ where: { id: parseInt(id) } })
    );

    const existingCategories = await Promise.all(categoryChecks);
    const invalidCategoryIds = categoryIdsArray.filter(
      (id, index) => !existingCategories[index]
    );

    if (invalidCategoryIds.length > 0) {
      return res.status(400).json({
        message: `Categories with ids ${invalidCategoryIds.join(
          ", "
        )} do not exist.`,
      });
    }

    const newStockStatus = quantity > 0;

    const newPlant = await prisma.plant.create({
      data: {
        name,
        type,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        stock: newStockStatus,
        userId,
        categories: {
          create: categoryIdsArray.map((id) => ({
            plantCategory: { connect: { id: parseInt(id) } },
          })),
        },
      },
    });

    await Promise.all(
      files.map((file) =>
        prisma.resources.create({
          data: {
            plantId: newPlant.id,
            filename: file.filename,
            type: file.mimetype,
          },
        })
      )
    );

    res.status(201).json({ message: "Plant created successfully" });
  } catch (error) {
    console.error("Error creating plant:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllPlants = async (req, res) => {
  try {
    const plants = await prisma.plant.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
        categories: {
          select: {
            plantCategory: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        resources: {
          select: {
            filename: true,
          },
        },
      },
    });

    res.status(200).json(plants);
  } catch (error) {
    console.log("Error retrieving plants:", error);
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
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
        categories: {
          select: {
            plantCategory: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        resources: {
          select: {
            filename: true,
          },
        },
      },
    });
    res.status(200).json(plant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while retrieving your plants." });
  }
};

const getPlantById = async (req, res) => {
  const plantId = parseInt(req.params.id);
  try {
    const plant = await findPlantById(plantId);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found." });
    }
    res.status(200).json(plant);
  } catch (error) {
    console.error("Error retrieving plant by ID:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updatePlantById = async (req, res) => {
  const plantId = req.params.id;
  const userId = req.user.id;
  const { name, type, price, quantity } = req.body;
  try {
    const plant = await prisma.plant.findFirst({
      where: { id: parseInt(plantId), userId },
    });

    if (!plant) {
      return res.status(404).json({ message: "Plant not found." });
    }
    if (quantity > 0) {
      stock = true;
    } else {
      stock = false;
    }

    const updatedPlant = await prisma.plant.update({
      where: { id: parseInt(plantId) },
      data: {
        name,
        type,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        stock,
      },
    });
    res.status(200).json(updatedPlant);
  } catch (error) {
    console.log("🚀 ~ updatePlantById ~ error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deletePlantById = async (req, res) => {
  const plantId = req.params.id;
  const userId = req.user.id;
  try {
    const plant = await prisma.plant.findFirst({
      where: { id: parseInt(plantId), userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
        categories: true,
      },
    });

    if (!plant) {
      return res.status(404).json({ message: "Plant not found." });
    }
    await prisma.plantCategoriesOnPlants.delete({
      where: {
        plantId_plantCategoryId: {
          plantId: plant.id,
          plantCategoryId: plant.categories[0].plantCategoryId,
        },
      },
    });

    await prisma.plant.delete({ where: { id: parseInt(plantId) } });
    res.status(200).json({ message: "Plant deleted successfully." });
  } catch (error) {
    console.log("🚀 ~ deletePlantById ~ error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getPlantsInStock = async (req, res) => {
  try {
    const plantsInStock = await findPlantsByStockStatus(req, true);
    res.status(200).json(plantsInStock);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getPlantsOutOfStock = async (req, res) => {
  try {
    const plantsOutOfStock = await findPlantsByStockStatus(req, false);
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
  const userId = req.user.id;
  const role = req.user.role;

  try {
    if (role !== "SELLER") {
      return res
        .status(400)
        .json({ message: "Only the seller can restock the plant ." });
    }

    const plant = await prisma.plant.findFirst({
      where: { id: parseInt(plantId), userId },
    });

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
    console.log("🚀 ~ restockPlantById ~ error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const findPlantsByStockStatus = async (req, stockStatus) => {
  const userId = req.user.id;
  return await prisma.plant.findMany({ where: { stock: stockStatus, userId } });
};
const findPlantById = async (plantId) => {
  return await prisma.plant.findUnique({
    where: { id: plantId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
      categories: {
        select: {
          plantCategory: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      resources: {
        select: {
          filename: true,
        },
      },
    },
  });
};

const deleteAllPlant = async (req, res) => {
  try {
    await prisma.plantCategoriesOnPlants.deleteMany();

    await prisma.plant.deleteMany();

    res.status(200).json({ message: "All plants deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
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
  deleteAllPlant,
  restockPlantById,
};

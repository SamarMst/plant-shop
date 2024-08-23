const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.PlantCategory.create({
      data: {
        name,
      },
    });
    res.json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCategory = async (req, res) => {
    try {
        const category = await prisma.PlantCategory.findMany();
        res.json(category);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
  createCategory,
  getCategory,
};

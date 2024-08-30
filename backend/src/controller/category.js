const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Empty field" });
    }
    const categoryExist = await prisma.plantCategory.findFirst({
      where: { name },
    });
    if (categoryExist) {
      return res.status(400).json({ message: "category exist" });
    }
    await prisma.plantCategory.create({
      data: {
        name,
      },
    });
    res.status(200).json({ message: "Category created" });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await prisma.plantCategory.findMany();
    res.json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createCategory,
  getCategory,
};

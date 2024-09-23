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

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "Empty field" });
    }

    const category = await prisma.plantCategory.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return res.status(400).json({ message: "Category does not exist" });
    }

    const existingCategory = await prisma.plantCategory.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category with this name already exists" });
    }
    await prisma.plantCategory.update({
      where: { id: Number(id) },
      data: { name },
    });

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  updateCategory,
};

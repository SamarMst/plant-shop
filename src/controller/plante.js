const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPlante = async (req, res) => {
  let { name, type, prix, qte, stock } = req.body;
  try {
    if (name === "" || prix <= 0) {
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

    if (qte > 0) {
      stock = true;
    }
    const plant = await prisma.plant.create({
      data: {
        name,
        type,
        prix,
        qte,
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

module.exports = { createPlante ,getPlants};

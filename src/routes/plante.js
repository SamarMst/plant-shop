const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { name, type, prix, qte, stock } = req.body;
  try {
    if (name == "" || prix <= 0) {
      res.status(400).json({ message: "please fill  " });
    }
    const plantExist = await prisma.plant.findFirst({
      where: {
        name,
      },
    });
    if (plantExist) {
      res.status(409).json({ message: "plante exist" });
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
    console.log("🚀 ~ router.post ~ error:", error);
  }
});

router.get("/", async (req, res) => {
  try {
    const plante = await prisma.plant.findMany();
    res.status(200).json(plante);
  } catch (error) {
    console.log("🚀 ~ router.get ~ error:", error);
  }
});

router.get("/:id", async (req, res) => {
  const planteId = req.params.id;
  try {
    const plante = await prisma.plant.findFirst({
      where: {
        id: parseInt(planteId),
      },
    });
    if (plante === null) {
      res.status(404).json({ message: "plante not found" });
    }
    res.status(200).json(plante);
  } catch (error) {
    console.log("🚀 ~ router.get ~ error:", error);
  }
});

router.put("/:id", async (req, res) => {
  const planteId = req.params.id;
  const { name, type, prix, qte, stock } = req.body;

  try {
    const plante = await prisma.plant.findFirst({
      where: {
        id: parseInt(planteId),
      },
    });

    if (plante === null) {
      res.status(404).json({ message: "plante not found" });
    }

    const updatedPlant = await prisma.plant.update({
      where: { id: parseInt(planteId) },
      data: { name, type, prix, qte, stock },
    });

    res.status(200).json(updatedPlant);
  } catch (error) {
    console.log("🚀 ~ router.put ~ error:", error);
  }
});

router.delete("/:id", async (req, res) => {
  const planteId = req.params.id;

  try {
    const plante = await prisma.plant.findFirst({
      where: {
        id: parseInt(planteId),
      },
    });

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
});

router.get("/stock", async (req, res) => {
  try {
    const planteInStock = await prisma.plant.findMany({
      where: {
        stock: true,
      },
    });
    res.status(200).json(planteInStock);
  } catch (error) {
    console.log("🚀 ~ router.get(/stock) ~ error:", error);
  }
});

router.get("/notinstock", async (req, res) => {
  try {
    const planteNotInStock = await prisma.plant.findMany({
      where: {
        stock: false,
      },
    });
    res.status(200).json(planteNotInStock);
  } catch (error) {
    console.log("🚀 ~ router.get(/notinstock) ~ error:", error);
    res.status(500).json({
      message: "An error occurred while retrieving plants not in stock.",
    });
  }
});

router.put("/restock/:id", async (req, res) => {
  const planteId = req.params.id;
  const { qte } = req.body;

  try {
    const plante = await prisma.plant.findFirst({
      where: {
        id: parseInt(planteId),
      },
    });

    if (plante === null) {
      return res.status(404).json({ message: "Plant not found." });
    }

    const newQte = plante.qte + qte;
    const updatedPlant = await prisma.plant.update({
      where: { id: parseInt(planteId) },
      data: { qte: newQte, stock: newQte > 0 },
    });

    res
      .status(200)
      .json({ message: "Plant restocked successfully.", plant: updatedPlant });
  } catch (error) {
    console.log("🚀 ~ router.put(/restock/:id) ~ error:", error);
  }
});

/**
 *  make route for modify plant also delete plant
 *
 *  (modifi prisma) : qte, stock:boolean
 *  routes => route get me all plants in stock ,
 *  route get me all plants not in stock
 *  route => restock
 */

module.exports = router;

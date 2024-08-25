const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getPlantsHistory = async (req, res) => {
  try {
    const userOrders = await prisma.order.findMany({
      where: {
        status: "ACCEPTED",
      },
      include: {
        plant: true,
        buyer: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getPlantsHistory,
};

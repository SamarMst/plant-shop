const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getHistory = async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    if (userRole === "SELLER") {
      const plantsSold = await prisma.order.findMany({
        where: {
          plant: {
            userId: userId,
          },
          status: "ACCEPTED",
        },
        include: {
          plant: true,
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      res.status(200).json({
        message: "Plants sold by the SELLER",
        data: plantsSold,
      });
    } else if (userRole === "BUYER") {
      const plantsBought = await prisma.order.findMany({
        where: {
          userId: userId,
          status: "ACCEPTED",
        },
        include: {
          plant: true,
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      res.status(200).json({
        message: "Plants bought by the BUYER",
        data: plantsBought,
      });
    } else {
      res.status(403).json({ message: "Unauthorized access." });
    }
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getHistory,
};

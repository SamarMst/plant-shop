const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { plantId, quantity } = req.body;
  const buyerId = req.user.id;

  try {
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity." });
    }

    const plant = await prisma.plant.findUnique({ where: { id: plantId } });
    if (!plant) {
      return res.status(404).json({ message: "Plant not found." });
    }

    if (plant.userId === buyerId) {
      return res
        .status(400)
        .json({ message: "You cannot buy your own plant." });
    }

    if (plant.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock available." });
    }

    const order = await prisma.order.create({
      data: {
        plantId,
        buyerId,
        sellerId: plant.userId,
        quantity,
      },
    });

    await prisma.plant.update({
      where: { id: plantId },
      data: { quantity: plant.quantity - quantity },
    });

    res.status(201).json({ message: "Order created successfully.", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  const sellerId = req.user.id;
  if (!["ACCEPTED", "REFUSED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }

  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (order.sellerId !== sellerId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this order." });
    }

    if (order.status !== "PENDING") {
      return res
        .status(400)
        .json({ message: "Order has already been processed." });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    if (status === "ACCEPTED") {
      const plant = await prisma.plant.findUnique({
        where: { id: order.plantId },
      });
      const updatedQuantity = plant.quantity - 1;

      await prisma.plant.update({
        where: { id: plant.id },
        data: {
          quantity: updatedQuantity,
          stock: updatedQuantity > 0,
        },
      });
    }

    res.status(200).json({
      message: `Order ${status.toLowerCase()} successfully.`,
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
};

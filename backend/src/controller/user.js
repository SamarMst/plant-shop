const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const setUserInfo = async (req, res) => {
  const { userId } = req.params;
  const { name, lastname, age } = req.body;

  if (!name || !lastname || !age) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find user by userId
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if userInfo already exists
    const existingUserInfo = await prisma.userInfo.findUnique({
      where: { userId: user.id },
    });

    if (existingUserInfo) {
      // Update existing user info
      const updatedUserInfo = await prisma.userInfo.update({
        where: { userId: user.id },
        data: { name, lastname, age },
      });
      return res.status(200).json({
        message: "User info updated successfully",
        userInfo: updatedUserInfo,
      });
    } else {
      // Create new user info
      const newUserInfo = await prisma.userInfo.create({
        data: {
          name,
          lastname,
          age,
          user: { connect: { id: user.id } },
        },
      });
      return res.status(201).json({
        message: "User info created successfully",
        userInfo: newUserInfo,
      });
    }
  } catch (error) {
    console.error("Error setting user info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserInfo = async (req, res) => {
  const { userId } = req.params;

  try {
    const userInfo = await prisma.userInfo.findUnique({
      where: { userId: parseInt(userId) },
      include: { user: true },
    });

    if (!userInfo) {
      return res.status(404).json({ message: "User info not found" });
    }

    return res.status(200).json(userInfo);
  } catch (error) {
    console.error("Error getting user info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  setUserInfo,
  getUserInfo,
};

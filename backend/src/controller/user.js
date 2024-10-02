const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * why user params when you got token
 * why update ? this is post method we should respect SRP 
 */
const setUserInfo = async (req, res) => {
  const { userId } = req.params;
  const { name, lastname, age } = req.body;

  if (!name || !lastname || !age) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingUserInfo = await prisma.userInfo.findUnique({
      where: { userId: user.id },
    });

    if (existingUserInfo) {
      const updatedUserInfo = await prisma.userInfo.update({
        where: { userId: user.id },
        data: { name, lastname, age: parseInt(age) },
      });
      return res.status(200).json({
        message: "User info updated successfully",
        userInfo: updatedUserInfo,
      });
    } else {
      const newUserInfo = await prisma.userInfo.create({
        data: {
          name,
          lastname,
          age: parseInt(age),
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

/**
 * why use params when you can get the user id from token
 * 
 */
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

const getUserInformation = async (req, res) => {
  const  userId  = req.user.id;
  try {
    const userInfo = await prisma.userInfo.findUnique({
      where: { userId},
      include:{
        user:{
          select:{
            role:true
          }
        }
      }
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


const setUserInformation = async (req, res) => {
  const  userId  = req.user.id;
  const { name, lastname, age } = req.body;

  if (!name || !lastname || !age) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingUserInfo = await prisma.userInfo.findUnique({
      where: { userId },
    });

    if (existingUserInfo) {
      const updatedUserInfo = await prisma.userInfo.update({
        where: { userId},
        data: { name, lastname, age: parseInt(age) },
      });
      return res.status(200).json({
        message: "User info updated successfully",
        userInfo: updatedUserInfo,
      });
    } else {
      const newUserInfo = await prisma.userInfo.create({
        data: {
          name,
          lastname,
          age: parseInt(age),
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


module.exports = {
  setUserInfo,
  getUserInfo,
  getUserInformation,
  setUserInformation
};

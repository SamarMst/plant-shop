const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password, ...rest } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "please fill the empty fields" });
    }

    const accountExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (accountExist) {
      res.status(409).json({ message: "account exist" });
    }

    const cryptedPassword = await bcrypt.hash(password, 10);

    const acountCreated = await prisma.user.create({
      data: {
        email,
        password: cryptedPassword,
        ...rest,
      },
    });

    res
      .status(201)
      .json({ message: "account created successfully", acountCreated });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "please fill the empty fields" });
    }

    const accountExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!accountExist) {
      res.status(404).json({ message: "account does not exist" });
    }
    const samePassword = await bcrypt.compare(password, accountExist.password);
    if (!samePassword) {
      res.status(401).json({ message: "Incorrect password" });
    }
    const accessToken = jwt.sign(
      { id: accountExist.id, role: accountExist.role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res
      .status(200)
      .json({ ...accountExist, password: undefined, token: accessToken });
  } catch (error) {}
};

module.exports = { register, login };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password, role = "BUYER", ...rest } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill the empty fields.!!!!" });
    }

    const accountExist = await prisma.user.findFirst({
      where: { email },
    });
    if (accountExist) {
      return res.status(409).json({ message: "Account already exists." });
    }

    const cryptedPassword = await bcrypt.hash(password, 10);

    const accountCreated = await prisma.user.create({
      data: {
        email,
        password: cryptedPassword,
        role: role.toUpperCase(),
        ...rest,
      },
    });

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: error.message });
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
    res.status(200).json({ token: accessToken });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };

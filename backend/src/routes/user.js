const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const {
  createPlant,
  getAllPlants,
  getPlantById,
  getMyOwnPlants,
  updatePlantById,
  deletePlantById,
  getPlantsInStock,
  getPlantsOutOfStock,
  restockPlantById,
} = require("../controller/user");

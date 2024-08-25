const yup = require("yup");

const ordersSchema = yup.object().shape({
  plantId: yup
    .number()
    .integer("Plant id must be an integer")
    .min(0, "Plant id must be at least 1")
    .required("Plant id is required"),
  quantity: yup
    .number()
    .integer("Quantity must be an integer")
    .min(0, "Quantity must be at least 0")
    .required("Quantity is required"),
});

const validateOrders = async (req, res, next) => {
  try {
    await ordersSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({ message: err.errors.join(", ") });
  }
};

module.exports = validateOrders;

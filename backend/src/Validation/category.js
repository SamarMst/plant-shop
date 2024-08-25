const yup = require("yup");

const categorySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

const validateCategory = async (req, res, next) => {
  try {
    await categorySchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({ message: err.errors.join(", ") });
  }
};

module.exports = validateCategory;

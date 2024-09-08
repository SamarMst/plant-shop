const yup = require("yup");

const userInfoSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  lastname: yup.string().required("Last name is required"),
  age: yup
    .number()
    .integer("Age must be an integer")
    .min(18, "Age must be at least 0")
    .required("Age is required"),
});

const validateUserInfo = async (req, res, next) => {
  try {
    await userInfoSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({ message: err.errors.join(", ") });
  }
};

module.exports = validateUserInfo;

const yup = require("yup");

const authSchema = yup.object().shape({
  email: yup.string().required("Email is required").email(),
  password: yup.string().required("Password is required"),
  role: yup
    .string()
    .oneOf(
      ["SELLER", "BUYER", "ADMIN"],
      'role must be either "SELLER", "BUYER", or "ADMIN"'
    )
    .required("Role is required"),
});

const validateAuth = async (req, res, next) => {
  try {
    await authSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({ message: err.errors.join(", ") });
  }
};

module.exports = validateAuth;

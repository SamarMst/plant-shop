const yup = require('yup');

const plantSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    type: yup.string().oneOf(['INDOOR', 'OUTDOOR'], 'Type must be either "indoor" or "outdoor"').optional(),
    price: yup.number().positive('Price must be positive').required('Price is required'),
    quantity: yup.number().integer('Quantity must be an integer').min(0, 'Quantity must be at least 0').required('Quantity is required'),
    
  });

const validatePlant = async (req, res, next) => {
  try {
    await plantSchema.validate(req.body, { abortEarly: false });
    next(); 
  } catch (err) {
    res.status(400).json({ message: err.errors.join(', ') });
  }
};

module.exports = validatePlant;

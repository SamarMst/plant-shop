const multer = require("multer");
const path = require("path");

const imageMulterConfig = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB file size limit
  },
});



module.exports = { imageMulterConfig };
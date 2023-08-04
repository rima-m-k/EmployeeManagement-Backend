const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const AppError = require('./AppError');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { 
    folder: 'EmployeeManagement',
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if ([ 'image/png'].includes(file.mimetype)) {
      cb(null, true);
    } else {
    //   cb( new AppError(422,'Invalid file format. Only PNG format allowed '));
    }
  },
});

module.exports = upload;

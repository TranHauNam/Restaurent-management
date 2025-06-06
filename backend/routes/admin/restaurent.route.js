const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/restaurant.controller');
const middleware = require('../../middleware/admin.middleware');
const multer = require('multer');
const path = require('path');

// Cấu hình lưu file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../uploads/restaurant'));
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const name = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
      cb(null, name);
    }
  });
  const upload = multer({ storage });

router.patch('/update', middleware.verifyAdmin, controller.updatedRestaurant);
router.post('/upload-image', middleware.verifyAdmin, upload.single('image'), controller.uploadImage);

module.exports = router;

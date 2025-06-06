const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/food.controller');
const middleware = require('../../middleware/admin.middleware');
const multer = require('multer');
const path = require('path');

// Cấu hình lưu file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/food'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, name);
  }
});
const upload = multer({ storage });

router.get('/search', middleware.verifyAdmin, controller.search);
router.get('/', middleware.verifyAdmin, controller.getAll);
router.post('/', middleware.verifyAdmin, controller.create);
router.put('/:id', middleware.verifyAdmin, controller.update);
router.delete('/:id', middleware.verifyAdmin, controller.delete);
router.get('/:id', middleware.verifyAdmin, controller.getById);
router.post('/upload-image', middleware.verifyAdmin, upload.single('image'), controller.uploadImage);

module.exports = router; 
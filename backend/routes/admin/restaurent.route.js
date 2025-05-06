const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/restaurant.controller');
const middleware = require('../../middleware/admin.middleware');
const upload = require('../../utils/upload');


router.patch('/update', middleware.verifyAdmin, upload.single('image'), controller.updatedRestaurant);

module.exports = router;

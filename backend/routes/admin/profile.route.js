const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/auth.controller');
const middleware = require('../../middleware/admin.middleware');

router.get('/', middleware.verifyAdmin, controller.getProfile);

module.exports = router;

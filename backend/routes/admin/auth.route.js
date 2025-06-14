const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/auth.controller');
const middleware = require('../../middleware/admin.middleware');

router.post('/login', controller.login);
router.post('/logout', middleware.verifyAdmin, controller.logout);

module.exports = router;

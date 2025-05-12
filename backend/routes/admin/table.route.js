const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/table.controller');
const middleware = require('../../middleware/admin.middleware');

router.get('/schedule/:date', middleware.verifyAdmin, controller.getScheduleByDate);

router.patch('/single-table', middleware.verifyAdmin, controller.updateSingleTable);

module.exports = router; 
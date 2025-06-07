const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/revenue.controller');
const middleware = require('../../middleware/admin.middleware');

router.get('/weekly', middleware.verifyAdmin, controller.getWeeklyRevenue);
router.get('/yearly', middleware.verifyAdmin, controller.getYearlyRevenue);
router.get('/range', middleware.verifyAdmin, controller.getRevenueByRange);

module.exports = router;

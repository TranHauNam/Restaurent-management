const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/table.controller');
const middleware = require('../../middleware/auth.middleware');

router.post('/', middleware.verifyToken, controller.tableReservation);

module.exports = router;

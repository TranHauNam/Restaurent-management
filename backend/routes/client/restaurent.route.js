const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/restaurant.controller');

router.get('/', controller.getAllRestaurents);
router.get('/available-times', controller.getAvailableTimes);
router.post('/table-reservation', controller.tableReservation);
router.get('/:id', controller.getRestaurentById);

module.exports = router;
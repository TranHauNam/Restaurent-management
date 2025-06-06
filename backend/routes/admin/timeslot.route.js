const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/timeslot.controller');
const middleware = require('../../middleware/admin.middleware');

router.get('/', middleware.verifyAdmin, controller.getAll);
router.post('/', middleware.verifyAdmin, controller.create);
router.put('/:id', middleware.verifyAdmin, controller.update);
router.delete('/:id', middleware.verifyAdmin, controller.delete);
router.get('/:id', middleware.verifyAdmin, controller.getById);

module.exports = router;
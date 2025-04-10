const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/auth.controller');

router.post('/register-email', controller.registerWithEmail);
router.post('/register-phone', controller.registerWithPhone);
router.post('/verify-otp', controller.verifyOTP);

module.exports = router;

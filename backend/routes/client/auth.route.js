const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/auth.controller');

router.post('/register-email', controller.registerWithEmail);
router.post('/verify-otp', controller.verifyOTP);
router.post('/login', controller.login);

module.exports = router;

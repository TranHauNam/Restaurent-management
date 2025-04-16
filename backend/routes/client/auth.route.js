const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/auth.controller');

/**
 * @swagger
 * /api/auth/register-email:
 *   post:
 *     summary: Đăng ký tài khoản bằng Email (Gửi OTP)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Trần Hậu Nam
 *               email:
 *                 type: string
 *                 example: haunam3112@gmail.com
 *     responses:
 *       200:
 *         description: OTP đã được gửi đến email
 *       400:
 *         description: Thiếu thông tin hoặc email đã tồn tại
 *       500:
 *         description: Lỗi server
 */
router.post('/register-email', controller.registerWithEmail);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Xác minh OTP để tạo hoặc đăng nhập tài khoản
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *             properties:
 *               otp:
 *                 type: string
 *                 example: '123456'
 *     responses:
 *       200:
 *         description: Xác minh thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đăng ký thành công
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       400:
 *         description: Mã OTP không đúng hoặc đã hết hạn
 *       500:
 *         description: Lỗi server
 */
router.post('/verify-otp', controller.verifyOTP);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập bằng email (gửi lại OTP)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: haunam3112@gmail.com
 *     responses:
 *       200:
 *         description: OTP đã được gửi đến email
 *       400:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.post('/login', controller.login);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/payment.controller');
const middleware = require('../../middleware/auth.middleware');

/**
 * @swagger
 * /api/payment/vnpay:
 *   post:
 *     summary: Tạo link thanh toán VNPay cho giỏ hàng
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về link thanh toán VNPay
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentUrl:
 *                   type: string
 *       400:
 *         description: Giỏ hàng trống
 *       500:
 *         description: Lỗi server
 */
router.post('/vnpay', middleware.verifyToken, controller.createVNPayPayment);

/**
 * @swagger
 * /api/payment/vnpay_return:
 *   get:
 *     summary: Callback từ VNPay
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: Thanh toán thành công
 *       400:
 *         description: Thanh toán thất bại
 */
router.get('/vnpay_return', controller.vnpayReturn);

module.exports = router; 
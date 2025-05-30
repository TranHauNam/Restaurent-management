const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/order.controller');
const middleware = require('../../middleware/auth.middleware');

/**
 * @swagger
 * /api/order/history:
 *   get:
 *     summary: Lấy lịch sử đơn hàng của người dùng
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về danh sách đơn hàng
 *       500:
 *         description: Lỗi server
 */
router.get('/history', middleware.verifyToken, controller.getOrderHistory);

/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Lấy chi tiết đơn hàng theo id
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID đơn hàng
 *     responses:
 *       200:
 *         description: Trả về chi tiết đơn hàng
 *       404:
 *         description: Không tìm thấy đơn hàng
 *       500:
 *         description: Lỗi server
 */
router.get('/:id', middleware.verifyToken, controller.getOrderDetail);

module.exports = router; 
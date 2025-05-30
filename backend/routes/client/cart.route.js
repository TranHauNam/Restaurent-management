const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/cart.controller');
const middleware = require('../../middleware/auth.middleware');

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Thêm món vào giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - foodId
 *               - quantity
 *             properties:
 *               foodId:
 *                 type: string
 *                 description: "ID món ăn"
 *                 example: "665b1e2f8b1e2f0012345678"
 *               quantity:
 *                 type: integer
 *                 description: "Số lượng"
 *                 example: 2
 *     responses:
 *       200:
 *         description: Thêm vào giỏ hàng thành công
 *       400:
 *         description: Thiếu thông tin
 *       500:
 *         description: Lỗi server
 */
router.post('/add', middleware.verifyToken, controller.addToCart);

module.exports = router; 
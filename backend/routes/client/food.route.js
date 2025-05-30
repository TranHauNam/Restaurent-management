const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/food.controller');

/**
 * @swagger
 * /api/food:
 *   get:
 *     summary: Lấy danh sách món ăn
 *     tags: [Food]
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách món ăn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 foods:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Food'
 *       500:
 *         description: Lỗi server
 */
router.get('/', controller.getAllFoods);

module.exports = router; 
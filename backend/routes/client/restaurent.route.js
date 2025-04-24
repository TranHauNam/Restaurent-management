const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/restaurant.controller');

/**
 * @swagger
 * /api/restaurant/:
 *   get:
 *     summary: Lấy danh sách tất cả nhà hàng
 *     tags: [Restaurant]
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách nhà hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurents:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Lỗi server
 */

router.get('/', controller.getAllRestaurents);

/**
 * @swagger
 * /api/restaurant/available-times:
 *   post:
 *     summary: Lấy các khung giờ có thể đặt bàn
 *     tags: [Restaurant]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantId
 *               - date
 *               - time
 *               - people
 *             properties:
 *               restaurantId:
 *                 type: string
 *                 example: "67fdcee953a92ee3d4342629"
 *               date:
 *                 type: string
 *                 example: "2025-04-21"
 *               time:
 *                 type: string
 *                 example: "09:45"
 *               people:
 *                 type: number
 *                 example: "2"
 *     responses:
 *       200:
 *         description: Trả về danh sách giờ còn trống
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 availableTimes:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Thiếu thuộc tính
 *       404:
 *         description: Không tìm thấy lịch
 *       500:
 *         description: Lỗi server
 */

router.post('/available-times', controller.getAvailableTimes);

/**
 * @swagger
 * /api/restaurant/{id}:
 *   get:
 *     summary: Lấy thông tin nhà hàng theo ID
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của nhà hàng
 *         schema:
 *           type: string
 *         example: "67fdcee953a92ee3d4342629"
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin nhà hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurent:
 *                   $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Không tìm thấy nhà hàng
 *       500:
 *         description: Lỗi server
 */

router.get('/:id', controller.getRestaurentById);

module.exports = router;

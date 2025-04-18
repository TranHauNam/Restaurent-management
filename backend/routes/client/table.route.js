const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/table.controller');

/**
 * @swagger
 * /api/table/table-reservation:
 *   post:
 *     summary: Đặt bàn tại nhà hàng
 *     tags: [Table]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - restaurantId
 *               - name
 *               - phone
 *               - date
 *               - tableReservationTime
 *               - people
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "67f788599750d4015affa4ba"
 *               restaurantId:
 *                 type: string
 *                 example: "67fdcee953a92ee3d4342629"
 *               name:
 *                 type: string
 *                 example: "Trần Hậu Nam"
 *               phone:
 *                 type: string
  *                 example: "0123456789"
 *               email:
 *                 type: string
  *                 example: "haunam3112@gmail.com"
 *               date:
 *                 type: string
 *                 example: "2025-04-21"
 *               tableReservationTime:
 *                 type: string
 *                 example: "10:30"
 *               people:
 *                 type: integer
 *                 example: "2"
 *     responses:
 *       200:
 *         description: Đặt bàn thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reservation:
 *                   $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Thiếu thông tin hoặc không có bàn trống
 *       404:
 *         description: Không tìm thấy nhà hàng hoặc lịch
 *       500:
 *         description: Lỗi server
 */
router.post('/table-reservation', controller.tableReservation);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/table.controller');
const middleware = require('../../middleware/auth.middleware');

/**
 * @swagger
 * /api/table:
 *   post:
 *     summary: Đặt bàn tại nhà hàng
 *     tags: [Table]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantId
 *               - name
 *               - phone
 *               - date
 *               - people
 *               - tableReservationTime
 *             properties:
 *               restaurantId:
 *                 type: string
 *                 description: "ID của nhà hàng"
 *                 example: "67fdcee953a92ee3d4342629"
 *               name:
 *                 type: string
 *                 description: "Tên người đặt bàn"
 *                 example: "Nguyễn Văn A"
 *               phone:
 *                 type: string
 *                 description: "Số điện thoại liên hệ"
 *                 example: "0912345678"
 *               email:
 *                 type: string
 *                 description: "Email liên hệ (có thể bỏ qua)"
 *                 example: "a@gmail.com"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: "Ngày đặt bàn (YYYY-MM-DD)"
 *                 example: "2024-06-10"
 *               people:
 *                 type: integer
 *                 description: "Số lượng người"
 *                 example: 4
 *               tableReservationTime:
 *                 type: string
 *                 description: "Khung giờ đặt bàn (theo định dạng hệ thống, ví dụ: \"18:00\")"
 *                 example: "18:00"
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
 *                   example: Đặt bàn thành công
 *                 reservation:
 *                   $ref: '#/components/schemas/Reservation'
 *                 notification:
 *                   type: object
 *                   nullable: true
 *       400:
 *         description: Thiếu thuộc tính hoặc không có bàn trống
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thiếu thuộc tính
 *       404:
 *         description: Không tìm thấy nhà hàng, lịch hoặc khung giờ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Không tìm thấy nhà hàng
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lỗi server
 *                 error:
 *                   type: string
 */
router.post('/', middleware.verifyToken, controller.tableReservation);

module.exports = router;

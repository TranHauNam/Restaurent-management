const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/notification.controller');
const authMiddleware = require('../../middleware/auth.middleware');

/**
 * @swagger
 * /api/notification/:
 *   get:
 *     summary: Lấy tất cả thông báo của người dùng hiện tại
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông báo thành công
 *       401:
 *         description: Không có thông tin người dùng hoặc token không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.get('/', authMiddleware.verifyToken, controller.getUserNotifications);

/**
 * @swagger
 * /api/notification/read-all:
 *   put:
 *     summary: Đánh dấu tất cả thông báo của người dùng hiện tại đã đọc
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Đánh dấu tất cả thông báo đã đọc thành công
 *       401:
 *         description: Không có thông tin người dùng hoặc token không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.put('/read-all', authMiddleware.verifyToken, controller.markAllAsRead);


/**
 * @swagger
 * /api/notification/{notificationId}:
 *   put:
 *     summary: Đánh dấu thông báo đã đọc
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đánh dấu thông báo đã đọc thành công
 *       400:
 *         description: Thiếu ID thông báo
 *       404:
 *         description: Không tìm thấy thông báo
 *       500:
 *         description: Lỗi server
 */
router.put('/:notificationId', controller.markAsRead);

module.exports = router; 
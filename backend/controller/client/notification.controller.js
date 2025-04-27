const Notification = require('../../models/notification.model');
const Reservation = require('../../models/reservation.model');
const { use } = require('../../routes/client/auth.route');

// Tạo thông báo khi đặt bàn thành công
module.exports.createReservationNotification = async (userId, reservationId) => {
    try {
        const reservation = await Reservation.findById(reservationId).populate('restaurantId');
        
        if (!reservation) {
            throw new Error('Không tìm thấy thông tin đặt bàn');
        }

        const restaurantName = reservation.restaurantId.name;
        const reservationTime = `${reservation.date} ${reservation.time}`;
        
        const notification = new Notification({
            userId,
            reservationId,
            message: `Bạn đã đặt bàn thành công tại ${restaurantName} vào lúc ${reservationTime} cho ${reservation.people} người.`,
            type: 'reservation_success'
        });

        await notification.save();
        return notification;
    } catch (error) {
        console.error('Lỗi tạo thông báo:', error);
        throw error;
    }
};

// Lấy thông báo của người dùng hiện tại từ token
module.exports.getUserNotifications = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: 'Không có thông tin người dùng'
            });
        }

        const userId = req.user.id;

        const notifications = await Notification.find({ userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'reservationId',
                populate: {
                    path: 'restaurantId',
                    select: 'name address'
                }
            });

        return res.status(200).json({
            message: 'Lấy thông báo thành công',
            notifications
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Đánh dấu thông báo đã đọc
module.exports.markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        
        if (!notificationId) {
            return res.status(400).json({
                message: 'Thiếu ID thông báo'
            });
        }

        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                message: 'Không tìm thấy thông báo'
            });
        }

        return res.status(200).json({
            message: 'Đánh dấu thông báo đã đọc thành công',
            notification
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Đánh dấu tất cả thông báo của người dùng hiện tại đã đọc
module.exports.markAllAsRead = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: 'Không có thông tin người dùng'
            });
        }

        const userId = req.user.id;
        
        await Notification.updateMany(
            { userId, isRead: false },
            { isRead: true }
        );

        return res.status(200).json({
            message: 'Đánh dấu tất cả thông báo đã đọc thành công'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Lỗi server',
            error: error.message
        });
    }
};

const Restaurent = require('../../models/restaurant.model');
const Schedule = require('../../models/schedule.model');
const Reservation = require('../../models/reservation.model');
const parseToMinutes = require('../../utils/parseToMinutes');
const notificationController = require('./notification.controller');

module.exports.tableReservation = async (req, res) => {
    const userId = req.user.id;
    const { restaurantId, name, phone, email, date, people, tableReservationTime } = req.body;

    if (!userId || !restaurantId || !name || !phone || !date || !tableReservationTime || !people) {
        return res.status(400).json({
            message: "Thiếu thuộc tính"
        });
    }

    try {
        // Kiểm tra xem nhà hàng có tồn tại không
        const restaurant = await Restaurent.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({
                message: "Không tìm thấy nhà hàng"
            });
        }

        // Kiểm tra lịch của nhà hàng cho ngày đã chọn
        const schedule = await Schedule.findOne({ restaurantId, date });
        if (!schedule) {
            return res.status(404).json({
                message: "Không tìm thấy lịch đặt bàn cho ngày này"
            });
        }

        // Kiểm tra xem khung giờ đã chọn có hợp lệ và có bàn trống không
        const slot = schedule.timeSlots.find((slot) => {
            return slot.time === tableReservationTime
        });
        if (!slot) {
            return res.status(404).json({
                message: "Khung giờ không hợp lệ"
            });
        }

        // Tìm bàn trống cho số lượng người yêu cầu
        const matchingTable = slot.tables.find((t) => {
            return t.people >= people && t.booked < t.quantity;
        });
        if (!matchingTable) {
            return res.status(400).json({
                message: "Không có bàn trống cho số lượng người này"
            });
        }

        // Tạo một đặt bàn mới
        const newReservation = new Reservation({
            userId,
            restaurantId,
            name,
            phone,
            email,
            date,
            time: tableReservationTime,
            people
        });

        // Lưu đặt bàn vào cơ sở dữ liệu
        const savedReservation = await newReservation.save();

        // Cập nhật trạng thái bàn đã đặt
        matchingTable.booked += 1;
        await schedule.save();

        // Tạo thông báo đặt bàn thành công
        let notification = null;
        try {
            notification = await notificationController.createReservationNotification(userId, savedReservation._id);
        } catch (error) {
            console.error('Lỗi khi tạo thông báo:', error);
            // Không trả về lỗi vì đặt bàn vẫn thành công, thông báo chỉ là tính năng bổ sung
        }

        return res.status(200).json({
            message: "Đặt bàn thành công",
            reservation: savedReservation,
            notification: notification
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
            error: error.message
        });
    }
};
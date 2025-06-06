const Restaurent = require('../../models/restaurant.model');
const Schedule = require('../../models/schedule.model');
const Reservation = require('../../models/reservation.model');
const notificationController = require('./notification.controller');
const TableType = require('../../models/tabletype.model');

module.exports.tableReservation = async (req, res) => {
    const userId = req.user.id;
    const { restaurantId, name, phone, email, date, people, tableReservationTime } = req.body;

    if (!userId || !restaurantId || !name || !phone || !date || !tableReservationTime || !people) {
        return res.status(400).json({
            message: "Thiếu thuộc tính"
        });
    }

    try {
        // Kiểm tra nhà hàng
        const restaurant = await Restaurent.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Không tìm thấy nhà hàng" });
        }

        // Lấy schedule của ngày
        const schedule = await Schedule.findOne({ restaurantId, date });
        if (!schedule) {
            return res.status(404).json({ message: "Không tìm thấy lịch đặt bàn cho ngày này" });
        }

        // Tìm timeslot theo giờ
        const slot = schedule.timeSlots.find(ts => ts.time === tableReservationTime);
        if (!slot) {
            return res.status(404).json({ message: "Khung giờ không hợp lệ" });
        }

        // Lấy thông tin loại bàn (TableType) cho từng loại bàn trong timeslot
        // Populate tableType cho từng bàn
        await Promise.all(slot.tables.map(async (t, idx) => {
            const tableType = await TableType.findById(t.tableType);
            slot.tables[idx].tableTypeObj = tableType;
        }));

        // Tìm loại bàn phù hợp
        let matchingTableIdx = -1;
        for (let i = 0; i < slot.tables.length; i++) {
            const t = slot.tables[i];
            if (t.tableTypeObj && t.tableTypeObj.people >= people && t.booked < t.tableTypeObj.quantity) {
                matchingTableIdx = i;
                break;
            }
        }
        if (matchingTableIdx === -1) {
            return res.status(400).json({ message: "Không có bàn trống cho số lượng người này" });
        }

        // Tăng số bàn đã đặt
        slot.tables[matchingTableIdx].booked += 1;
        // Xóa trường phụ
        delete slot.tables[matchingTableIdx].tableTypeObj;
        await schedule.save();

        // Tạo đặt bàn mới
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
        const savedReservation = await newReservation.save();

        // Tạo thông báo
        let notification = null;
        try {
            notification = await notificationController.createReservationNotification(userId, savedReservation._id);
        } catch (error) {
            console.error('Lỗi khi tạo thông báo:', error);
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
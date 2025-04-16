const Restaurent = require('../../models/restaurant.model');
const Schedule = require('../../models/schedule.model');
const Reservation = require('../../models/reservation.model');
const parseToMinutes = require('../../utils/parseToMinutes');

module.exports.getAllRestaurents = async (req, res) => {
    try {
        const restaurents = await Restaurent.find();
        return res.status(200).json({
            restaurents
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
            error: error.message
        })
    }
}

module.exports.getRestaurentById = async (req, res) => {
    try {
        const restaurent = await Restaurent.findById(req.params.id);
        if (!restaurent) {
            return res.status(404).json({
                message: "Không tìm thấy nhà hàng"
            })
        }
        return res.status(200).json({
            restaurent
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
            error: error.message
        })
    }
}


module.exports.getAvailableTimes = async (req, res) => {
    const {restaurantId, date, time, people} = req.body;

    if (!restaurantId || !date || !time || !people) {
        return res.status(400).json({
            message: "Thiếu thuộc tính"
        })
    }

    try {
        const schedule = await Schedule.findOne({
            restaurantId: restaurantId,
            date: date
        });

        if (!schedule) {
            return res.status(404).json({
                message: "Không tìm thấy lịch"
            })
        }

        const userTimeMinute = parseToMinutes(time);

        const availableTimes = [];

        for (const slot of schedule.timeSlots) {
            const slotMinute = parseToMinutes(slot.time);

            if (slotMinute >= userTimeMinute) {
                const matchingTable = slot.tables.find((t) => {
                    return t.people >= people && t.booked < t.quantity;
                })

                if (matchingTable) {
                    availableTimes.push(slot.time);
                }
            }
        }

        return res.status(200).json({
            availableTimes  
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
            error: error.message
        })
    }
}

module.exports.tableReservation = async (req, res) => {
    const { userId, restaurantId, name, phone, email, date, people, tableReservationTime } = req.body;

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

        return res.status(200).json({
            message: "Đặt bàn thành công",
            reservation: savedReservation
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
            error: error.message
        });
    }
};
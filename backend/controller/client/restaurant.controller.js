const Restaurent = require('../../models/restaurant.model');
const Schedule = require('../../models/schedule.model');
const Reservation = require('../../models/reservation.model');
const parseToMinutes = require('../../utils/parseToMinutes');
const TableType = require('../../models/tabletype.model');
const mongoose = require('mongoose');

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
            date: date,
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
                // Populate tableType cho từng bàn
                const tablesWithType = await Promise.all(
                  slot.tables.map(async (t) => {
                    const tableType = await TableType.findById(t.tableType);
                    return {
                      ...t.toObject(),
                      people: tableType?.people,
                      quantity: tableType?.quantity
                    };
                  })
                );
                const matchingTable = tablesWithType.find((t) => {
                  return t.people >= people && t.booked < t.quantity;
                });
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

module.exports.updateTableType = async (req, res) => {
    const { restaurantId, people, quantity } = req.body;
    if (!restaurantId || !people || !quantity) {
        return res.status(400).json({ message: "Thiếu thuộc tính" });
    }
    try {
        // 1. Sửa trong restaurant
        const restaurant = await Restaurent.findById(restaurantId);
        if (!restaurant) return res.status(404).json({ message: "Không tìm thấy nhà hàng" });

        const tableType = restaurant.tableTypes.find(t => t.people === people);
        if (!tableType) return res.status(404).json({ message: "Không tìm thấy loại bàn này" });
        tableType.quantity = quantity;
        await restaurant.save();

        // 2. Sửa trong tất cả schedule
        const schedules = await Schedule.find({ restaurantId });
        for (const schedule of schedules) {
            for (const slot of schedule.timeSlots) {
                const t = slot.tables.find(t => t.people === people);
                if (t) t.quantity = quantity;
            }
            await schedule.save();
        }

        return res.json({ message: "Cập nhật loại bàn thành công", tableTypes: restaurant.tableTypes });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

module.exports.deleteTableType = async (req, res) => {
    const { restaurantId, people } = req.body;
    if (!restaurantId || !people) {
        return res.status(400).json({ message: "Thiếu thuộc tính" });
    }
    try {
        // 1. Xóa trong restaurant
        const restaurant = await Restaurent.findById(restaurantId);
        if (!restaurant) return res.status(404).json({ message: "Không tìm thấy nhà hàng" });

        restaurant.tableTypes = restaurant.tableTypes.filter(t => t.people !== people);
        await restaurant.save();

        // 2. Xóa trong tất cả schedule
        const schedules = await Schedule.find({ restaurantId });
        for (const schedule of schedules) {
            for (const slot of schedule.timeSlots) {
                slot.tables = slot.tables.filter(t => t.people !== people);
            }
            await schedule.save();
        }

        return res.json({ message: "Xóa loại bàn thành công", tableTypes: restaurant.tableTypes });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

module.exports.addTableType = async (req, res) => {
    const { restaurantId, people, quantity } = req.body;
    if (!restaurantId || !people || !quantity) {
        return res.status(400).json({ message: "Thiếu thuộc tính" });
    }
    try {
        // 1. Thêm vào restaurant
        const restaurant = await Restaurent.findById(restaurantId);
        if (!restaurant) return res.status(404).json({ message: "Không tìm thấy nhà hàng" });

        if (restaurant.tableTypes.some(t => t.people === people)) {
            return res.status(400).json({ message: "Đã có loại bàn này" });
        }
        restaurant.tableTypes.push({ people, quantity });
        await restaurant.save();

        // 2. Thêm vào tất cả schedule của nhà hàng
        const schedules = await Schedule.find({ restaurantId });
        for (const schedule of schedules) {
            for (const slot of schedule.timeSlots) {
                if (!slot.tables.some(t => t.people === people)) {
                    slot.tables.push({ people, quantity, booked: 0 });
                }
            }
            await schedule.save();
        }

        return res.json({ message: "Thêm loại bàn thành công", tableTypes: restaurant.tableTypes });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};


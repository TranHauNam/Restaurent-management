const mongoose = require('mongoose');
const Restaurent = require('../../models/restaurant.model');
const Schedule = require('../../models/schedule.model');
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
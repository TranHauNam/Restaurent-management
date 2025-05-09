const Schedule = require('../models/Schedule');

// Cập nhật/Thêm bàn theo date + time
module.exports.updateTable = async (req, res) => {
  try {
    const { date, time, tables } = req.body;
    const restaurantId = req.admin.restaurantId;

    if (!date || !time || !tables || !Array.isArray(tables)) {
      return res.status(400).json({ message: 'Thiếu dữ liệu đầu vào' });
    }

    let schedule = await Schedule.findOne({ restaurantId, date });

    if (!schedule) {
      // tạo mới nếu chưa có
      schedule = new Schedule({
        restaurantId,
        date,
        timeSlots: [{ time, tables }]
      });
    } else {
      const timeSlotIndex = schedule.timeSlots.findIndex(slot => slot.time === time);
      if (timeSlotIndex === -1) {
        schedule.timeSlots.push({ time, tables });
      } else {
        // Cập nhật tables (không reset booked)
        const existingTables = schedule.timeSlots[timeSlotIndex].tables;
        tables.forEach(newTable => {
          const index = existingTables.findIndex(t => t.people === newTable.people);
          if (index === -1) {
            existingTables.push({ ...newTable });
          } else {
            existingTables[index].quantity = newTable.quantity;
            // giữ nguyên số lượng đã đặt (booked)
          }
        });
      }
    }

    await schedule.save();
    return res.json({ message: 'Cập nhật lịch thành công', schedule });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

const Schedule = require('../../models/schedule.model');


// Lấy danh sách giờ và bàn theo ngày
module.exports.getScheduleByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const restaurantId = req.admin.restaurantId;

    if (!date) {
      return res.status(400).json({ message: 'Vui lòng chọn ngày' });
    }

    let schedule = await Schedule.findOne({ restaurantId, date });

    if (!schedule) {
      return res.status(404).json({ message: 'Chưa có lịch cho ngày này' });
    }

    return res.json({ 
      message: 'Lấy lịch thành công', 
      schedule: schedule.timeSlots 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Cập nhật một bàn cụ thể trong khung giờ
module.exports.updateSingleTable = async (req, res) => {
  try {
    const { date, time, people, quantity } = req.body;
    const restaurantId = req.admin.restaurantId;

    if (!date || !time || !people || quantity === undefined) {
      return res.status(400).json({ message: 'Thiếu dữ liệu đầu vào' });
    }

    let schedule = await Schedule.findOne({ restaurantId, date });

    if (!schedule) {
      return res.status(404).json({ message: 'Không tìm thấy lịch cho ngày này' });
    }

    const timeSlotIndex = schedule.timeSlots.findIndex(slot => slot.time === time);
    if (timeSlotIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy khung giờ này' });
    }

    const tableIndex = schedule.timeSlots[timeSlotIndex].tables.findIndex(
      t => t.people === people
    );

    if (tableIndex === -1) {
      // Thêm loại bàn mới
      schedule.timeSlots[timeSlotIndex].tables.push({
        people,
        quantity,
        booked: 0
      });
    } else {
      // Cập nhật số lượng bàn
      const existingTable = schedule.timeSlots[timeSlotIndex].tables[tableIndex];
      if (quantity < existingTable.booked) {
        return res.status(400).json({ 
          message: 'Không thể giảm số lượng bàn xuống dưới số bàn đã đặt' 
        });
      }
      existingTable.quantity = quantity;
    }

    await schedule.save();
    return res.json({ 
      message: 'Cập nhật bàn thành công', 
      updatedTimeSlot: schedule.timeSlots[timeSlotIndex] 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};


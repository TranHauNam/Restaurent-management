const TimeSlot = require('../../models/timeslot.model');
const TableType = require('../../models/tabletype.model');
const Schedule = require('../../models/schedule.model');

// Lấy tất cả khung giờ của 1 nhà hàng
exports.getAll = async (req, res) => {
  try {
    const restaurantId = req.admin.restaurantId;
    const slots = await TimeSlot.find({ restaurantId }).populate('tables');
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Thêm khung giờ
exports.create = async (req, res) => {
  try {
    const { time } = req.body;
    const restaurantId = req.admin.restaurantId;
    if (!time || !restaurantId) return res.status(400).json({ message: 'Thiếu thông tin' });

    // Lấy tất cả tableType của nhà hàng
    const tableTypes = await TableType.find({ restaurantId });
    if (!tableTypes.length) return res.status(400).json({ message: 'Nhà hàng chưa có loại bàn nào' });

    // Kiểm tra đã có timeslot này chưa (theo time và restaurant)
    // (nếu muốn lưu timeslot riêng, có thể bỏ qua đoạn này)
    // const exists = await TimeSlot.findOne({ time, restaurantId });
    // if (exists) return res.status(400).json({ message: 'Đã có khung giờ này' });

    // Tạo timeslot mới (nếu vẫn muốn lưu bảng timeslot riêng)
    const tables = tableTypes.map(t => t._id);
    const slot = await TimeSlot.create({ time, tables, restaurantId });

    // Tạo schedule cho từng ngày trong 1 tháng tới
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const dateObj = new Date(today);
      dateObj.setDate(today.getDate() + i);
      const dateStr = dateObj.toISOString().slice(0, 10); // YYYY-MM-DD

      // Lấy schedule ngày đó
      let schedule = await Schedule.findOne({ restaurantId, date: dateStr });
      // Tạo object timeslot cho schedule
      const scheduleTimeSlot = {
        time,
        tables: tableTypes.map(t => ({ tableType: t._id, booked: 0 }))
      };
      if (!schedule) {
        // Nếu chưa có schedule, tạo mới
        schedule = await Schedule.create({
          restaurantId,
          date: dateStr,
          timeSlots: [scheduleTimeSlot]
        });
      } else {
        // Nếu đã có schedule, kiểm tra trùng time
        const exists = schedule.timeSlots.some(ts => ts.time === time);
        if (!exists) {
          schedule.timeSlots.push(scheduleTimeSlot);
          await schedule.save();
        }
      }
    }

    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Sửa khung giờ
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { time, tables } = req.body;
    const slot = await TimeSlot.findByIdAndUpdate(id, { time, tables }, { new: true }).populate('tables');
    if (!slot) return res.status(404).json({ message: 'Không tìm thấy khung giờ' });
    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Xóa khung giờ
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await TimeSlot.findByIdAndDelete(id);
    if (!slot) return res.status(404).json({ message: 'Không tìm thấy khung giờ' });
    res.json({ message: 'Đã xóa khung giờ', slot });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Lấy timeslot theo id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await TimeSlot.findById(id).populate('tables');
    if (!slot) return res.status(404).json({ message: 'Không tìm thấy khung giờ' });
    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
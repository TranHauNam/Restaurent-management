const mongoose = require('mongoose');

const tableTypeSchema = new mongoose.Schema({
  people: { type: Number, required: true }, 
  quantity: { type: Number, required: true },  
  booked: { type: Number, default: 0 }   
});

// Một khung giờ cụ thể
const timeSlotSchema = new mongoose.Schema({
  time: { type: String, required: true },      // "18:00"
  tables: [tableTypeSchema]                    // danh sách loại bàn
});

const scheduleSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  date: { type: String, required: true },      // "YYYY-MM-DD"
  timeSlots: [timeSlotSchema]
});

scheduleSchema.index({ restaurantId: 1, date: 1 }, { unique: true }); // mỗi nhà hàng có 1 lịch/ngày

const Schedule = mongoose.model('Schedule', scheduleSchema, 'schedules');

module.exports = Schedule;

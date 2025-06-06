const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  time: { type: String, required: true },  // "18:00"
  tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TableType' }], // Liên kết với các loại bàn
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }  // Liên kết với nhà hàng
});

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema, 'timeslots');
module.exports = TimeSlot;

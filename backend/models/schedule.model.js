const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  date: { type: String, required: true },  // "YYYY-MM-DD"
  timeSlots: [{
    time: { type: String, required: true }, // "18:00"
    tables: [{
      tableType: { type: mongoose.Schema.Types.ObjectId, ref: 'TableType' },
      booked: { type: Number, default: 0 }
    }]
  }]
});

scheduleSchema.index({ restaurantId: 1, date: 1 }, { unique: true });

const Schedule = mongoose.model('Schedule', scheduleSchema, 'schedules');
module.exports = Schedule;

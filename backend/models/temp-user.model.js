const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // Hết hạn sau 5 phút
});

const TempUser = mongoose.model("TempUser", tempUserSchema);

module.exports = TempUser;

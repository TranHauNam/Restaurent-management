const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String },
  phone: { type: String },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // Hết hạn sau 5 phút
});

const OTP = mongoose.model("OTP", otpSchema, 'otps');

module.exports = OTP;

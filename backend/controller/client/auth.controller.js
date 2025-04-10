const User = require('../../models/user.model');
const TempUser = require('../../models/temp-user.model');
const sendMail = require('../../utils/sendMail');
const generateOTP = require('../../utils/generateOTP');
const jwt = require('jsonwebtoken');

// Đăng ký bằng Email
module.exports.registerWithEmail = async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ tên và email' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    const otp = generateOTP();

    await TempUser.findOneAndUpdate(
      { email },
      { fullName, email, otp, createdAt: new Date() },
      { upsert: true }
    );

    await sendMail(email, 'Mã OTP xác thực', `<p>Mã OTP của bạn là: <b>${otp}</b></p>`);

    return res.status(200).json({ message: 'OTP đã được gửi đến email' });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Đăng ký bằng Số điện thoại
module.exports.registerWithPhone = async (req, res) => {
  
};

// Xác minh OTP
module.exports.verifyOTP = async (req, res) => {
    const { otp } = req.body;
  
    if (!otp) {
      return res.status(400).json({ message: 'Vui lòng nhập mã OTP' });
    }
  
    try {
      // Tìm người dùng tạm có OTP trùng và thời gian gần nhất
      const tempUser = await TempUser.findOne({ otp }).sort({ createdAt: -1 });
  
      if (!tempUser) {
        return res.status(400).json({ message: 'Mã OTP không chính xác hoặc đã hết hạn' });
      }
  
      // Kiểm tra xem đã có tài khoản thật chưa
      const existingUser = await User.findOne({
        $or: [
          { email: tempUser.email },
          { phone: tempUser.phone }
        ]
      });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Tài khoản đã tồn tại' });
      }
  
      // Tạo tài khoản chính thức
      const newUser = new User({
        fullName: tempUser.fullName,
        email: tempUser.email || null,
        phone: tempUser.phone || null,
      });
  
      await newUser.save();
      await tempUser.deleteOne();
  
      // Tạo token đăng nhập
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });
  
      return res.status(201).json({
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          phone: newUser.phone,
        },
        token: token
      });
    } catch (err) {
      return res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
};
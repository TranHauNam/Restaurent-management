const User = require('../../models/user.model');
const OTP = require('../../models/otp.model');
const sendMail = require('../../utils/sendMail');
const generateOTP = require('../../utils/generateOTP');
const jwt = require('jsonwebtoken');
const axios = require('axios');

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

    await OTP.findOneAndUpdate(
      { email },
      { fullName, email, otp, createdAt: new Date() },
      { upsert: true }
    );

    await sendMail(email, 'Mã OTP xác thực', `<p>Mã OTP của bạn là: <b>${otp}</b></p>`);

    return res.status(200).json({ message: 'OTP đã được gửi đến email' });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Lỗi server', 
      error: error.message 
    });
  }
};

// Xác minh OTP
module.exports.verifyOTP = async (req, res) => {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: 'Vui lòng nhập mã OTP' });
    }
  
    try {
      // Tìm người dùng tạm có OTP trùng và thời gian gần nhất
      const otpReceived = await OTP.findOne({ otp }).sort({ createdAt: -1 });

      if (!otpReceived) {
        return res.status(400).json({ message: 'Mã OTP không chính xác hoặc đã hết hạn' });
      }
  
      const otpStorage = otpReceived.otp;

      // Kiểm tra xem đã có tài khoản thật chưa
      const existingUser = await User.findOne({
        email: otpReceived.email
      });
  
      let user = null;
      let tokenUser = null;
      if (!existingUser) {
        // Tạo tài khoản chính thức
        user = new User({
          fullName: otpReceived.fullName,
          email: otpReceived.email || null,
          phone: otpReceived.phone || null,
        });
    
        // Tạo token đăng nhập
        tokenUser = jwt.sign(
          { id: user._id }, 
          process.env.JWT_SECRET, 
          { expiresIn: '7d' }
        );

        user.tokenUser = tokenUser;
        await user.save();
      } else {
        user = existingUser;
        tokenUser = jwt.sign(
          { id: user._id }, 
          process.env.JWT_SECRET, 
          { expiresIn: '7d' }
        );

        user.tokenUser = tokenUser;
        await user.save();
      }
  
      
      await otpReceived.deleteOne();
  
      // Tạo token đăng nhập
      // const token = jwt.sign(
      //   { id: user._id }, 
      //   process.env.JWT_SECRET, 
      //   { expiresIn: '7d' }
      // );
  
      return res.status(200).json({
        message: existingUser ? 'Đăng nhập thành công' : 'Đăng ký thành công',
        user
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Lỗi server', 
        error: error.message 
      });
    }
};

module.exports.login  = async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({message: "Vui lòng nhập email"});
  }

  try {
    const existingUser = await User.findOne({ email });
    
    if (!existingUser) {
      return res.status(400).json({message: "Người dùng không tồn tại"});
    }

    const otp = generateOTP();

    await OTP.findOneAndUpdate(
      { email },
      { email, otp, createdAt: new Date() },
      { upsert: true }
    );

    await sendMail(email, 'Mã OTP xác thực', `<p>Mã OTP của bạn là: <b>${otp}</b></p>`);
    
    return res.status(200).json({ 
      message: 'OTP đã được gửi đến email',
      otp: otp
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Lỗi server.',
      error: error.message 
    });
  }
}
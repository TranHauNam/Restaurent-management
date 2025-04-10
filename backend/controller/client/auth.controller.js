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

// Đăng ký bằng Số điện thoại
module.exports.registerWithPhone = async (req, res) => {
    // const { fullName, phone } = req.body;

    // if (!fullName || !phone) {
    //     return res.status(400).json({ message: 'Vui lòng nhập họ tên và số điện thoại' });
    // }

    // try {
    //     const existingUser = await User.findOne({ phone });
    //     if (existingUser) {
    //         return res.status(400).json({ message: 'Số điện thoại đã được đăng ký' });
    //     }
    
    //     // const otp = generateOTP();
    
    //     // await TempUser.findOneAndUpdate(
    //     //     { phone },
    //     //     { fullName, phone, otp, createdAt: new Date() },
    //     //     { upsert: true }
    //     // );

        
    //     const apiKey = process.env.ESMS_API_KEY;
    // const secretKey = process.env.ESMS_SECRET_KEY;
    // //const brandName = process.env.ESMS_BRAND_NAME;

    // const otpLength = 6;
    // const timeAlive = 300; // OTP sống trong 5 phút
    // const messageTemplate = 'Mã xác thực của bạn là {code}';

    // const url = `http://api.esms.vn/MainService.svc/json/SendMessageAutoGenCode_V4_get?` +
    //   `Phone=${phone}` +
    //   `&ApiKey=${apiKey}` +
    //   `&SecretKey=${secretKey}` +
    //   `&TimeAlive=${timeAlive}` +
    //   `&NumCharOfCode=${otpLength}` +
    //   `&Language=VN` +
    //   //`&Brandname=${brandName}` +
    //   `&Type=1` +
    //   `&message=${encodeURIComponent(messageTemplate)}` +
    //   `&IsNumber=true`;

    // const response = await axios.get(url);
    
    // const { CodeResult, Code, SMSID, ErrorMessage } = response.data;
    // console.log(response);
    // if (CodeResult === '100') {
    //     await TempUser.findOneAndUpdate(
    //         { phone },
    //         { fullName: fullName, phone: phone, otp: Code, createdAt: new Date() },
    //         { upsert: true }
    //     );
    //   return res.status(200).json({ message: 'OTP đã được gửi', otpCode: Code, smsId: SMSID });
    // } else {
    //   return res.status(500).json({ message: 'Gửi OTP thất bại', error: ErrorMessage });
    // }
    // } catch (err) {
    //     console.log(err)
    //     return res.status(500).json({ 
    //         message: 'Lỗi server', 
    //         error: err.message
    //     });
    // }
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
  
      // Kiểm tra xem đã có tài khoản thật chưa
      const existingUser = await User.findOne({
        $or: [
          { email: otpReceived.email },
          { phone: otpReceived.phone }
        ]
      });
  
      let user = null;

      if (!existingUser) {
        // Tạo tài khoản chính thức
        user = new User({
          fullName: otpReceived.fullName,
          email: otpReceived.email || null,
          phone: otpReceived.phone || null,
        });
    
        await user.save();
      } else {
        user = existingUser;
      }
  
      
      await otpReceived.deleteOne();
  
      // Tạo token đăng nhập
      const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '7d' }
      );
  
      return res.status(200).json({
        message: existingUser ? 'Đăng nhập thành công' : 'Đăng ký thành công',
        user,
        token
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Lỗi server', 
        error: error.message 
      });
    }
};

module.exports.login = async (req, res) => {
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
    
    return res.status(200).json({ message: 'OTP đã được gửi đến email' });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Lỗi server.',
      error: error.message 
    });
  }
}
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports.verifyToken = (req, res, next) => {
    try {
        // Lấy token từ header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Không tìm thấy token xác thực'
            });
        }

        const token = authHeader.split(' ')[1];
        
        // Xác thực token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Token không hợp lệ hoặc đã hết hạn'
                });
            }
            // Gán thông tin người dùng vào request
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Lỗi xác thực',
            error: error.message
        });
    }
}; 
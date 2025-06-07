const Admin = require('../../models/admin.model.js');

// Lấy thông tin cá nhân admin
module.exports.getProfile = async (req, res) => {
    try {
        const admin = req.admin;
        if (!admin) return res.status(401).json({ message: 'Chưa xác thực' });
        // Không trả về password
        const { password, ...adminData } = admin._doc || admin;
        res.json({ admin: adminData });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

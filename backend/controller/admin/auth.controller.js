const Admin = require('../../models/admin.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: 'Email không tồn tại' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu' });

        // const tokenAdmin = jwt.sign(
        //     { id: admin._id },
        //     process.env.JWT_SECRET,
        //     { expiresIn: '7d' }
        // );

        return res.status(200).json({
            message: 'Đăng nhập thành công',
            // tokenAdmin,
            restaurantId: admin.restaurantId,
            tokenAdmin: admin.tokenAdmin
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

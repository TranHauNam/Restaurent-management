const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

module.exports.verifyAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Không có token xác thực' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.id);
        if (!admin) {
            return res.status(403).json({ message: 'Admin không hợp lệ' });
        }

        req.admin = admin; // gán thông tin admin vào request
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token không hợp lệ', error: err.message });
    }
};


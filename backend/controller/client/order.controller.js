const Order = require('../../models/order.model');

// Lấy lịch sử đơn hàng của user
module.exports.getOrderHistory = async (req, res) => {
    const userId = req.user.id;
    try {
        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .populate('items.foodId');
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Lấy chi tiết đơn hàng theo id
module.exports.getOrderDetail = async (req, res) => {
    const userId = req.user.id;
    const orderId = req.params.id;
    try {
        const order = await Order.findOne({ _id: orderId, userId })
            .populate('items.foodId');
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}; 
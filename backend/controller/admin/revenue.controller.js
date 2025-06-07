const Restaurant = require('../../models/restaurant.model');
const Order = require('../../models/order.model');


// Thống kê doanh thu theo tuần (hiển thị từng ngày trong tuần)
module.exports.getWeeklyRevenue = async (req, res) => {
    try {
        const admin = req.admin;
        const restaurantId = admin.restaurantId;
        const now = new Date();
        const day = now.getDay() === 0 ? 7 : now.getDay();
        const monday = new Date(now);
        monday.setDate(now.getDate() - day + 1);
        monday.setHours(0,0,0,0);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23,59,59,999);
        const revenue = await Order.aggregate([
            {
                $match: {
                    restaurantId: typeof restaurantId === 'string' ? require('mongoose').Types.ObjectId(restaurantId) : restaurantId,
                    status: 'paid',
                    createdAt: { $gte: monday, $lte: sunday }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    total: { $sum: '$total' }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        const result = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            const key = d.toISOString().slice(0, 10);
            const found = revenue.find(r => r._id === key);
            result.push({ date: key, total: found ? found.total : 0 });
        }
        res.json(result);
    } catch (error) {
        console.error('Lỗi khi thống kê doanh thu tuần:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Thống kê doanh thu theo năm (hiển thị từng tháng trong năm)
module.exports.getYearlyRevenue = async (req, res) => {
    try {
        const admin = req.admin;
        const restaurantId = admin.restaurantId;
        const year = parseInt(req.query.year) || new Date().getFullYear();
        const start = new Date(`${year}-01-01T00:00:00.000Z`);
        const end = new Date(`${year}-12-31T23:59:59.999Z`);
        const revenue = await Order.aggregate([
            {
                $match: {
                    restaurantId: typeof restaurantId === 'string' ? require('mongoose').Types.ObjectId(restaurantId) : restaurantId,
                    status: 'paid',
                    createdAt: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                    total: { $sum: '$total' }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        const result = [];
        for (let i = 0; i < 12; i++) {
            const month = (i + 1).toString().padStart(2, '0');
            const key = `${year}-${month}`;
            const found = revenue.find(r => r._id === key);
            result.push({ month: key, total: found ? found.total : 0 });
        }
        res.json(result);
    } catch (error) {
        console.error('Lỗi khi thống kê doanh thu năm:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Thống kê doanh thu trong một khoảng thời gian bất kỳ
module.exports.getRevenueByRange = async (req, res) => {
    try {
        const admin = req.admin;
        const restaurantId = admin.restaurantId;
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Thiếu startDate hoặc endDate' });
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23,59,59,999);
        const revenue = await Order.aggregate([
            {
                $match: {
                    restaurantId: typeof restaurantId === 'string' ? require('mongoose').Types.ObjectId(restaurantId) : restaurantId,
                    status: 'paid',
                    createdAt: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    total: { $sum: '$total' }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(revenue);
    } catch (error) {
        console.error('Lỗi khi thống kê doanh thu theo khoảng thời gian:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

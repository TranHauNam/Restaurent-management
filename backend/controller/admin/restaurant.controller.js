const Restaurant = require('../../models/restaurant.model');

module.exports.updatedRestaurant = async (req, res) => {
    try {
        const admin = req.admin;
        const restaurantId = admin.restaurantId;

        const {
            name,
            address,
            openTime,
            closeTime,
            description
        } = req.body;

        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (address !== undefined) updateData.address = address;
        if (openTime !== undefined) updateData.openTime = openTime;
        if (closeTime !== undefined) updateData.closeTime = closeTime;
        if (description !== undefined) updateData.description = description;

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            restaurantId,
            updateData,
            { new: true }
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Không tìm thấy nhà hàng' });
        }

        return res.status(200).json({
            message: 'Cập nhật thành công',
            restaurant: updatedRestaurant
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật nhà hàng:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

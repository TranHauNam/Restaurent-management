const Cart = require('../../models/cart.model');

module.exports.addToCart = async (req, res) => {
    const userId = req.user.id;
    const { foodId, quantity } = req.body;

    if (!foodId || !quantity) {
        return res.status(400).json({ message: "Thiếu thông tin món ăn hoặc số lượng" });
    }

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [{ foodId, quantity }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ foodId, quantity });
            }
        }
        await cart.save();
        return res.status(200).json({ message: "Thêm vào giỏ hàng thành công", cart });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
}; 
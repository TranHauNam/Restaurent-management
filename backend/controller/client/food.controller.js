const Food = require('../../models/food.model');

module.exports.getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        return res.status(200).json({ foods });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
}; 
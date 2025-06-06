const Food = require('../../models/food.model');
const path = require('path');
const fs = require('fs');

// Lấy tất cả món ăn của nhà hàng
exports.getAll = async (req, res) => {
  try {
    const restaurantId = req.admin.restaurantId;
    const foods = await Food.find({ restaurantId });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Thêm món ăn
exports.create = async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    const restaurantId = req.admin.restaurantId;
    if (!name || !price) return res.status(400).json({ message: 'Thiếu thông tin' });
    const food = await Food.create({ name, price, image, description, restaurantId });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Sửa món ăn
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image, description } = req.body;
    const restaurantId = req.admin.restaurantId;
    const food = await Food.findOneAndUpdate(
      { _id: id, restaurantId },
      { name, price, image, description },
      { new: true }
    );
    if (!food) return res.status(404).json({ message: 'Không tìm thấy món ăn' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Xóa món ăn
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = req.admin.restaurantId;
    const food = await Food.findOneAndDelete({ _id: id, restaurantId });
    if (!food) return res.status(404).json({ message: 'Không tìm thấy món ăn' });
    res.json({ message: 'Đã xóa món ăn', food });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Lấy món ăn theo id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = req.admin.restaurantId;
    const food = await Food.findOne({ _id: id, restaurantId });
    if (!food) return res.status(404).json({ message: 'Không tìm thấy món ăn' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Tìm kiếm món ăn theo tên
exports.search = async (req, res) => {
  try {
    const restaurantId = req.admin.restaurantId;
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Thiếu từ khóa tìm kiếm' });
    const foods = await Food.find({
      restaurantId,
      name: { $regex: q, $options: 'i' }
    });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Upload ảnh món ăn
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Không có file ảnh' });
    // Đường dẫn public cho ảnh
    const imageUrl = `/uploads/food/${req.file.filename}`;
    res.json({ url: imageUrl });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
}; 
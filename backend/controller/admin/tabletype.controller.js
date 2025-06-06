const TableType = require('../../models/tabletype.model');

// Lấy tất cả loại bàn của 1 nhà hàng
exports.getAll = async (req, res) => {
  try {
    const restaurantId = req.admin.restaurantId;
    const types = await TableType.find({ restaurantId });
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Thêm loại bàn
exports.create = async (req, res) => {
  try {
    const { people, quantity } = req.body;
    const restaurantId = req.admin.restaurantId;
    if (!people || !quantity) return res.status(400).json({ message: 'Thiếu thông tin' });
    const exists = await TableType.findOne({ people, restaurantId });
    if (exists) return res.status(400).json({ message: 'Đã có loại bàn này' });
    const type = await TableType.create({ people, quantity, restaurantId });
    res.json(type);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Sửa loại bàn
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { people, quantity } = req.body;
    const type = await TableType.findByIdAndUpdate(id, { people, quantity }, { new: true });
    if (!type) return res.status(404).json({ message: 'Không tìm thấy loại bàn' });
    res.json(type);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Xóa loại bàn
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await TableType.findByIdAndDelete(id);
    if (!type) return res.status(404).json({ message: 'Không tìm thấy loại bàn' });
    res.json({ message: 'Đã xóa loại bàn', type });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
const mongoose = require('mongoose');

const tableTypeSchema = new mongoose.Schema({
  people: { type: Number, required: true }, 
  quantity: { type: Number, required: true },  
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }  // Liên kết với nhà hàng
});

const TableType = mongoose.model('TableType', tableTypeSchema, 'tabletypes');
module.exports = TableType;

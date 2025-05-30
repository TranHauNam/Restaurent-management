const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' }, // pending, paid, failed
    vnp_TxnRef: { type: String },
    vnp_ResponseCode: { type: String },
    vnp_TransactionNo: { type: String },
    vnp_PayDate: { type: String }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order; 
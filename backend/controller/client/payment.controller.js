const Cart = require('../../models/cart.model');
const Order = require('../../models/order.model');
const querystring = require('qs');
const crypto = require('crypto');

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports.createVNPayPayment = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await Cart.findOne({ userId }).populate('items.foodId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Giỏ hàng trống' });
        }
        let total = 0;
        cart.items.forEach(item => {
            total += item.foodId.price * item.quantity;
        });
        const order = new Order({
            userId,
            items: cart.items,
            total,
            status: 'pending',
            vnp_TxnRef: undefined // sẽ cập nhật sau khi có _id
        });
        await order.save();
        let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
        const tmnCode = process.env.VNP_TMN_CODE;
        const secretKey = process.env.VNP_HASH_SECRET;
        const vnpUrl = process.env.VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        const returnUrl = process.env.VNP_RETURN_URL || 'http://localhost:5001/api/payment/vnpay_return';
        const date = new Date();
        const createDate = date.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
        const orderId = order._id.toString().slice(-8);
        // Cập nhật vnp_TxnRef cho order
        order.vnp_TxnRef = orderId;
        await order.save();
        let vnp_Params = {
            'vnp_Version': '2.1.0',
            'vnp_Command': 'pay',
            'vnp_TmnCode': tmnCode,
            'vnp_Locale': 'vn',
            'vnp_CurrCode': 'VND',
            'vnp_TxnRef': orderId,
            'vnp_OrderInfo': `Thanh toán đơn hàng ${orderId}`,
            'vnp_OrderType': 'other',
            'vnp_Amount': total * 100,
            'vnp_ReturnUrl': returnUrl,
            // 'vnp_IpAddr': req.ip || req.connection.remoteAddress,
            'vnp_IpAddr': ipAddr,
            'vnp_CreateDate': createDate
        };
        vnp_Params = sortObject(vnp_Params);
        const signData = querystring.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        const paymentUrl = vnpUrl + '?' + querystring.stringify(vnp_Params, { encode: false });
        res.status(200).json({ paymentUrl });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

module.exports.vnpayReturn = async (req, res) => {
    const vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    const secretKey = process.env.VNP_HASH_SECRET;
    const signData = querystring.stringify(sortObject(vnp_Params), { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    if (secureHash === signed) {
        const orderId = vnp_Params['vnp_TxnRef'];
        const order = await Order.findOneAndUpdate(
            { vnp_TxnRef: orderId },
            {
                status: vnp_Params['vnp_ResponseCode'] === '00' ? 'paid' : 'failed',
                vnp_TxnRef: vnp_Params['vnp_TxnRef'],
                vnp_ResponseCode: vnp_Params['vnp_ResponseCode'],
                vnp_TransactionNo: vnp_Params['vnp_TransactionNo'],
                vnp_PayDate: vnp_Params['vnp_PayDate']
            },
            { new: true }
        );
        if (order && vnp_Params['vnp_ResponseCode'] === '00') {
            await Cart.findOneAndDelete({ userId: order.userId });
            return res.status(200).json({ message: 'Thanh toán thành công', order });
        } else {
            return res.status(400).json({ message: 'Thanh toán thất bại', order });
        }
    } else {
        return res.status(400).json({ message: 'Sai chữ ký VNPay' });
    }
}; 
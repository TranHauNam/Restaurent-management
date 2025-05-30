const authRoutes = require('./auth.route');
const restaurantRoutes = require('./restaurent.route')
const notificationRoutes = require('./notification.route')
const tableRoutes = require('./table.route')
const foodRoutes = require('./food.route');
const cartRoutes = require('./cart.route');
const paymentRoutes = require('./payment.route');
const orderRoutes = require('./order.route');

module.exports = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/restaurant', restaurantRoutes);
    app.use('/api/notification', notificationRoutes);
    app.use('/api/table', tableRoutes);
    app.use('/api/food', foodRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/payment', paymentRoutes);
    app.use('/api/order', orderRoutes);
}
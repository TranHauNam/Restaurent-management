const authRoutes = require('./auth.route');
const restaurantRoutes = require('./restaurent.route')
const notificationRoutes = require('./notification.route')

module.exports = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/restaurant', restaurantRoutes);
    app.use('/api/notification', notificationRoutes);
}
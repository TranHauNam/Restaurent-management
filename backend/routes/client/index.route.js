const authRoutes = require('./auth.route');
const restaurantRoutes = require('./restaurent.route')

module.exports = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/restaurant', restaurantRoutes);
}
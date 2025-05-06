const authRoutes = require('../admin/auth.route');
const restaurantRoutes = require('../admin/restaurent.route');

module.exports = (app) => {
    app.use('/api/admin/auth', authRoutes)
    app.use('/api/admin/restaurant', restaurantRoutes)
}
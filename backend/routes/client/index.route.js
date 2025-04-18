const authRoutes = require('./auth.route');
const restaurantRoutes = require('./restaurent.route');
const tableRoutes = require('./table.route');

module.exports = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/restaurant', restaurantRoutes);
    app.use('/api/table', tableRoutes);
}
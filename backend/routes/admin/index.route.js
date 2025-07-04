const authRoutes = require('../admin/auth.route');
const restaurantRoutes = require('../admin/restaurent.route');
const tableRoutes = require('../admin/table.route');
const tableTypeRoutes = require('./tabletype.route');
const timeSlotRoutes = require('./timeslot.route');
const foodRoutes = require('./food.route');
const revenueRoutes = require('./revenue.route');
const profileRoutes = require('./profile.route');

module.exports = (app) => {
    app.use('/api/admin/auth', authRoutes);
    app.use('/api/admin/restaurant', restaurantRoutes);
    app.use('/api/admin/table', tableRoutes);
    app.use('/api/admin/tabletype', tableTypeRoutes);
    app.use('/api/admin/timeslot', timeSlotRoutes);
    app.use('/api/admin/food', foodRoutes);
    app.use('/api/admin/revenue', revenueRoutes);
    app.use('/api/admin/profile', profileRoutes);
}
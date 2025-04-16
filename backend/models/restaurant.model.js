const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
    {
        name: String,
        address: String,
        image: String,
        openTime: String,
        closeTime: String,
        description: String,
        availableTimes: [String]
    },
    {
        timestamps: true
    }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema, 'restaurants');

module.exports = Restaurant;

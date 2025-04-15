const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: String,
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        people: {
            type: Number,
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

const Reservation = mongoose.model('Reservation', reservationSchema, 'reservations');

module.exports =  Reservation;

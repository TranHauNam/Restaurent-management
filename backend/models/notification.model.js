const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        reservationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reservation',
            required: true
        },
        message: {
            type: String,
            required: true
        },
        isRead: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            enum: ['reservation_success', 'reservation_canceled', 'other'],
            default: 'other'
        }
    },
    {
        timestamps: true
    }
);

const Notification = mongoose.model('Notification', notificationSchema, 'notifications');

module.exports = Notification; 
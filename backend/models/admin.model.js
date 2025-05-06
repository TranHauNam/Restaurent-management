const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    restaurantId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant', 
        required: true 
    },
    tokenAdmin: {
        type: String
        // require: true
    }
}, {
    timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema, );

module.exports = Admin;
